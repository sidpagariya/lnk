<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col class="text-center text-h4">Welcome!</v-col>
    </v-row>
  </v-container>
</template>

<script>
import { analytics } from '@/firebase'
analytics.logEvent('visit_home')
export default {
  name: 'Home',
}
</script>
