<!--template>
  <v-container fill-height fluid>
    <v-row justify="center" align="center">
      <v-col class="text-center text-h4" lg="3" md="4" sm="6" cols="9">
        <v-card elevation="10" :loading="loading">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-text-field
                v-model="email"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                counter
                required
              ></v-text-field>
              <v-checkbox
                v-model="checkbox"
                label="Do you agree?"
                required
              ></v-checkbox>
              <v-btn type="submit">
                Submit
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      email: '',
      showPassword: false,
    }
  },
}
</script-->
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
                label="Username"
                :rules="usernameRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
    username: null,
    usernameRules: [v => !!v || 'Username is required'],
    password: null,
    passwordRules: [v => !!v || 'Password is required'],
    showPassword: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    submitLogin(e) {
      e.preventDefault()
      this.loading = true
      this.validate()
      if (this.valid) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
        })
        this.loading = true
      } else {
        this.loading = false
      }
    },
  },
}
</script>
