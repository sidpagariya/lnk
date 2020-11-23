<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-card elevation="10" :loading="loading">
        <v-card-title>
          Your Links
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="links"
          :search="search"
          no-data-text="No links found!"
        ></v-data-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { auth, usersCollection } from '../firebase'
export default {
  name: 'Dashboard',
  data: () => ({
    loading: true,
    search: '',
    headers: [
      {
        text: 'Short Link',
        value: 'shortlink',
        align: 'end',
      },
      {
        text: 'Full URL',
        value: 'url',
      },
    ],
    links: [],
  }),
  mounted() {
    usersCollection
      .doc(auth.currentUser.uid)
      .collection('links')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.links.push(doc.data())
        })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>
