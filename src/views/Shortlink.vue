<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <div class="text-center" v-if="$route.params.link !== '404'">
        <v-progress-circular
          indeterminate
          color="primary"
          :size="50"
          :width="5"
        />
        <v-col class="text-center text-h4"> Redirecting you... </v-col>
      </div>
      <div class="text-center" v-else>
        <v-icon size="50">mdi-robot-dead-outline</v-icon>
        <v-col class="text-center text-h4"> ERROR 404 - Not found </v-col>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { linksCollection } from '@/firebase'
export default {
  name: 'Shortlink',
  methods: {
    getLinkForRef: async function(ref) {
      return linksCollection
        .doc(ref)
        .get()
        .then(doc => {
          if (doc.exists) {
            let data = doc.data()
            console.log(data.url)
            return data.url
          } else {
            console.log('does not exist!')
            return '/404'
          }
        })
    },
  },
  created: async function() {
    if (this.$route.params.link !== '404') {
      this.getLinkForRef(this.$route.params.link).then(link => {
        window.location.href = link
      })
    }
  },
}
</script>
