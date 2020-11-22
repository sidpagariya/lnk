<template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col class="text-center text-h4" lg="3" md="4" sm="6" cols="9">
        <v-card elevation="10" :loading="loading">
          <v-card-title>Sign Up</v-card-title>
          <v-card-text>
            <v-form
              ref="form"
              @submit="submitSignup"
              v-model="valid"
              lazy-validation
              class="mx-0"
            >
              <v-text-field
                v-model="fullname"
                label="Full Name"
                :rules="fullnameRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="username"
                label="Username"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="E-mail"
                :rules="emailRules"
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
                Sign Up
              </v-btn>

              <div class="mt-4">
                Already have an account?
                <router-link to="login">Login here</router-link>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    valid: false,
    fullname: null,
    fullnameRules: [v => !!v || 'Fullname is required'],
    username: null,
    usernameRules: [v => !!v || 'Username is required'],
    email: null,
    emailRules: [v => !!v || 'E-mail is required'],
    password: null,
    passwordRules: [v => !!v || 'Password is required'],
    showPassword: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    submitSignup(e) {
      e.preventDefault()
      this.loading = true
      this.validate()
      if (this.valid) {
        this.$store.dispatch('signup', {
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
        })
      }
      this.loading = false
    },
  },
}
</script>
