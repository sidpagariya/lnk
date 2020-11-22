<template>
  <v-app>
    <AppNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppNav from '@/components/Nav'
export default {
  name: 'App',
  components: {
    AppNav,
  },
}
</script>

<style></style>
