<template>
  <v-app-bar elevate-on-scroll app>
    <v-toolbar-title>{{ appTitle }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleDark">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppNav',
  data() {
    return {
      appTitle: "Sid's Quick Links",
    }
  },
  methods: {
    toggleDark: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    },
  },
  mounted() {
    const theme = localStorage.getItem('dark_theme')
    if (theme) {
      if (theme == 'true') {
        this.$vuetify.theme.dark = true
      } else {
        this.$vuetify.theme.dark = false
      }
    }
  },
}
</script>

<style scoped></style>
