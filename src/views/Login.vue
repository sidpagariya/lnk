<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col class="text-center text-h4" lg="3" md="4" sm="6" cols="9">
        <v-card elevation="10" :loading="loading">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              @submit="submitLogin"
              v-model="valid"
              lazy-validation
              class="mx-0"
            >
              <v-text-field
                v-model="username"
                label="E-mail"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :rules="passwordRules"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4"
                type="submit"
              >
                Login
              </v-btn>
              <div class="mt-4">
                Forgot your password?
                <a href="#" @click="passwordResetDialog = true">Reset here</a>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        <v-dialog
          width="auto "
          :fullscreen="$vuetify.breakpoint.xsOnly"
          v-model="passwordResetDialog"
          scrollable
        >
          <v-card elevation="10" :loading="loading">
            <v-card-title>Reset Password</v-card-title>
            <v-card-text>
              <v-form
                ref="form"
                @submit="resetPassword"
                v-model="validPass"
                lazy-validation
                class="mx-0"
              >
                <v-text-field
                  v-model="email1"
                  label="Email"
                  :rules="email1Rules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closePasswordResetDialog"> Close </v-btn>
              <v-btn
                :disabled="!validPass"
                color="green"
                text
                @click="resetPassword()"
              >
                Send Link
              </v-btn>
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
import { auth } from '../firebase'
import StatusSnackbar from '@/components/StatusSnackbar'

export default {
  components: {
    StatusSnackbar,
  },
  data: () => ({
    loading: false,
    valid: false,
    username: null,
    usernameRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: null,
    passwordRules: [v => !!v || 'Password is required'],
    showPassword: false,
    passwordResetDialog: false,
    validPass: false,
    email1: null,
    email1Rules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    showSnackbar: false,
    snackbarType: 'error',
    snackbarText: '',
  }),
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    submitLogin(e) {
      e.preventDefault()
      this.loading = true
      this.validate()
      if (this.valid && this.username && this.password) {
        this.$store
          .dispatch('login', {
            username: this.username,
            password: this.password,
          })
          .catch(err => {
            console.log(err)
            this.snackbarText = err.message
            this.snackbarType = 'error'
            this.showSnackbar = true
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    async resetPassword(e) {
      if (e) e.preventDefault()
      this.loading = true
      if (this.email1) {
        auth
          .sendPasswordResetEmail(this.email1)
          .then(() => {
            this.snackbarText =
              'Password reset link sent. Please check your email!'
            this.snackbarType = 'success'
            this.showSnackbar = true
          })
          .catch(err => {
            this.snackbarText = err.message
            this.snackbarType = 'error'
            this.showSnackbar = true
          })
      }
      this.loading = false
    },
    closePasswordResetDialog() {
      this.$refs.form.resetValidation()
      this.passwordResetDialog = false
    },
  },
}
</script>
