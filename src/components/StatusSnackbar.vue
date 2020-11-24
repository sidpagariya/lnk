<template>
  <v-snackbar
    :value="show"
    :timeout="timeout"
    :color="color"
    elevation="24"
    @input="closeSnackbar"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="closeSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
      required: true,
    },
    text: {
      type: String,
      default: '',
      required: true,
    },
    timeout: {
      type: Number,
      default: 5000,
    },
    type: {
      type: String,
      default: 'primary',
    },
  },
  data: () => ({
    colors: {
      warning: 'amber darken-3',
      error: 'red darken-1',
      success: 'green darken-1',
      default: 'primary',
    },
  }),
  computed: {
    color() {
      if (Object.keys(this.colors).indexOf(this.$props.type) !== -1) {
        return this.colors[this.$props.type]
      }
      return this.colors['default']
    },
  },
  methods: {
    closeSnackbar(snackbar) {
      this.$emit('close', snackbar)
    },
  },
}
</script>
