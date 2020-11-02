<template>
  <v-app>
    <app-nav></app-nav>
    <v-main>
      <router-view></router-view>
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
