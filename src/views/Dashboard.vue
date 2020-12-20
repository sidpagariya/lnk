<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-card elevation="10" :loading="loading" class="ma-4" width="100%">
        <v-card-title>
          Your Links
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer />
          <v-btn fab color="green" @click="dialog = true">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="links"
          :search="search"
          no-data-text="No links found!"
        >
          <template v-slot:[`item.shortlink`]="{ item }">
            <router-link :to="item.shortlink">{{ item.shortlink }}</router-link>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            <v-icon small class="ml-2" @click="copyToClip(item.shortlink)">
              mdi-content-copy
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
      <v-col class="text-center text-h4" lg="3" md="4" sm="6" cols="9">
        <v-dialog
          v-model="dialog"
          max-width="600px"
          :fullscreen="$vuetify.breakpoint.xsOnly"
        >
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form
                ref="form"
                @submit="save"
                v-model="valid"
                lazy-validation
                class="mx-0"
              >
                <v-text-field
                  v-model="editedItem.shortlink"
                  label="Shortlink"
                  v-if="editedItem.id === ''"
                  :rules="shortlinkRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.url"
                  label="Full URL"
                  :rules="urlRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close"> Cancel </v-btn>
              <v-btn
                color="green darken-1"
                text
                :disabled="!valid"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          width="auto "
          :fullscreen="$vuetify.breakpoint.xsOnly"
        >
          <v-card>
            <v-card-title class="headline">
              Are you sure you want to delete this item?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDelete">Cancel</v-btn>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">
                YES
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <StatusSnackbar
          :show="showSnackbar"
          :text="snackbarText"
          :type="snackbarType"
          @close="showSnackbar = false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StatusSnackbar from '@/components/StatusSnackbar'

import {
  auth,
  analytics,
  db,
  linksCollection,
  usersCollection,
} from '@/firebase'
analytics.logEvent('visit_dashboard')
export default {
  name: 'Dashboard',
  components: {
    StatusSnackbar,
  },
  data: () => ({
    loading: true,
    search: '',
    headers: [
      { text: 'Short Link', value: 'shortlink', align: 'end' },
      { text: 'Full URL', value: 'url' },
      {
        text: 'Actions',
        value: 'actions',
        width: '96px',
        align: 'center',
        sortable: false,
      },
    ],
    links: [],
    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    shortlinkRules: [v => !!v || 'Shortlink is required'],
    urlRules: [
      v => !!v || 'URL is required',
      v =>
        /(http(s)?):\/\/[(www.)?a-zA-Z0-9@:%._+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/.test(
          v
        ) || 'URL must be valid',
    ],
    valid: false,
    editedItem: {
      shortlink: '',
      url: '',
      id: '',
    },
    defaultItem: {
      shortlink: '',
      url: '',
      id: '',
    },
    showSnackbar: false,
    snackbarType: 'success',
    snackbarText: '',
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'New Shortlink'
        : `Edit ${this.editedItem.shortlink}`
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    fetchLinks() {
      let links = []
      usersCollection
        .doc(auth.currentUser.uid)
        .collection('links')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            links.push({ ...doc.data(), id: doc.id })
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.links = links
          this.loading = false
        })
    },

    editItem(item) {
      this.editedIndex = this.links.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.links.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    copyToClip(text) {
      console.log(`${window.location.origin}/${text}`)
      var textArea = document.createElement('textarea')

      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if the element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a
      // flash, so some of these are just precautions. However in
      // Internet Explorer the element is visible whilst the popup
      // box asking the user for permission for the web page to
      // copy to the clipboard.
      //

      // Place in the top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed'
      textArea.style.top = 0
      textArea.style.left = 0

      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em'
      textArea.style.height = '2em'

      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0

      // Clean up any borders.
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'

      // Avoid flash of the white box if rendered for any reason.
      textArea.style.background = 'transparent'

      textArea.value = `${window.location.origin}/${text}`

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        var successful = document.execCommand('copy')
        if (!successful) throw 'unsuccessful copy'
        this.snackbarText = `Successfully copied shortlink ${text}!`
        this.snackbarType = 'success'
        this.showSnackbar = true
      } catch (err) {
        this.snackbarText = `Error copying shortlink ${text}!`
        this.snackbarType = 'error'
        this.showSnackbar = true
      }

      document.body.removeChild(textArea)
    },
    deleteItemConfirm() {
      var batch = db.batch()
      var linksRef = linksCollection.doc(this.editedItem.shortlink)
      var usersLinkRef = usersCollection
        .doc(auth.currentUser.uid)
        .collection('links')
        .doc(this.editedItem.id)
      batch.delete(linksRef)
      batch.delete(usersLinkRef)
      batch
        .commit()
        .then(() => {
          this.snackbarText = `Successfully deleted shortlink ${this.editedItem.shortlink}!`
          this.snackbarType = 'success'
          this.showSnackbar = true
          this.links.splice(this.editedIndex, 1)
          this.closeDelete()
        })
        .catch(err => {
          this.snackbarText = `Error deleting shortlink ${this.editedItem.shortlink}: ${err.message}`
          this.snackbarType = 'error'
          this.showSnackbar = true
        })
    },

    close() {
      this.dialog = false
      this.$refs.form.resetValidation()
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save(e) {
      if (e) e.preventDefault()
      var batch = db.batch()
      var linksRef = linksCollection.doc(this.editedItem.shortlink)
      var usersLinksRef = usersCollection
        .doc(auth.currentUser.uid)
        .collection('links')
      var snackbarTitle
      if (this.editedIndex > -1) {
        if (this.editedItem.url == this.links[this.editedIndex].url) return
        batch.update(linksRef, { url: this.editedItem.url })
        batch.update(usersLinksRef.doc(this.editedItem.id), {
          url: this.editedItem.url,
        })
        snackbarTitle = 'updat'
        Object.assign(this.links[this.editedIndex], this.editedItem)
      } else {
        var exists = (await linksRef.get()).exists
        if (exists) {
          this.snackbarText = `Error: shortlink '${this.editedItem.shortlink} already exists'`
          this.snackbarType = 'error'
          this.showSnackbar = true
          return
        }
        usersLinksRef = usersLinksRef.doc()
        batch.set(linksRef, { url: this.editedItem.url })
        batch.set(usersLinksRef, {
          shortlink: this.editedItem.shortlink,
          url: this.editedItem.url,
        })
        snackbarTitle = 'creat'
      }
      batch
        .commit()
        .then(() => {
          this.snackbarText = `Successfully ${snackbarTitle}ed link for ${this.editedItem.shortlink}!`
          this.snackbarType = 'success'
          this.showSnackbar = true
          if (this.editedIndex === -1) {
            this.editedItem.id = usersLinksRef.id
            this.links.push(this.editedItem)
          }
          this.close()
        })
        .catch(err => {
          this.snackbarText = `Error ${snackbarTitle}ing link for ${this.editedItem.shortlink}: ${err.message}`
          this.snackbarType = 'error'
          this.showSnackbar = true
        })
    },
  },
  mounted() {
    this.fetchLinks()
  },
}
</script>
