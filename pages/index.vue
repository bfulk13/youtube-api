<template>
  <div class="main-div">
    <h2 v-if="!valid">Please login or register to see content</h2>
    <v-form @submit="checkForm" novalidate="true">
      <!-- #v-if directive -->
      <div v-if="errors.length">
        <br>
        <p>
        <b>Please correct the following error(s):</b>
        </p>
        <ul>
          <!-- #list -->
          <li v-for="error in errors">
            <p>{{ error }}</p>
          </li>
        </ul>
      </div>
      <div class="container" id="app">
        <v-text-field id="email" v-model="email" label="E-mail" required></v-text-field>
        <v-text-field
          id="password"
          v-model="password"
          :type="passwordView ? 'text' : 'password'"
          label="Password"
          required
        ></v-text-field>
        <v-btn
          id="hide-pw-btn"
          color="warning"
          type="button"
          aria-describedby="password-label"
          @click.prevent="passwordView = !passwordView"
        >{{ passwordView ? 'Hide' : 'Display' }}</v-btn>

        <v-btn id="login-button" color="success" type="submit" :disabled="!email || !password">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
import { mapMutations } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    hero
  },

  data() {
    return {
      errors: [],
      email: '',
      emailRules: [
        v => !!v || 'Valid E-mail is required',
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          (v &&
            (/[A-Z]/.test(pw) &&
              /[a-z]/.test(pw) &&
              /[0-9]/.test(pw) &&
              pw.length >= 6 &&
              pw.length <= 10)) ||
          'Password must contain 1 capital letter, 1 lower case letter, 1 number, and between 6-10 characters'
      ],
      passwordView: false,
      valid: false
    }
  },

  middleware: 'authenticated',

  methods: {
    checkForm(e) {
      e.preventDefault()

      this.errors = []

      if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.')
      }

      if (!this.validPassword(this.password)) {
        this.errors.push(
          'Password must contain 1 capital letter, 1 lower case letter, 1 number, and between 6-10 characters'
        )
      }

      if (!this.errors.length) {
        this.valid = true
        this.login()
        return true
      }
    },

    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },

    validPassword(pw) {
      return (
        /[A-Z]/.test(pw) &&
        /[a-z]/.test(pw) &&
        /[0-9]/.test(pw) &&
        pw.length >= 6 &&
        pw.length <= 10
      )
    },

    async login() {
      if (this.valid) {
        await setTimeout(() => {
          this.$store.commit('SET_USER', email) // mutating to store for client rendering
          Cookie.set('user', email) // saving token in cookie for server rendering
          this.$router.push('/search')
        }, 1500)
      }
    }
  }
}
</script>

<style scoped>
/* .main-div {
  display: flex;
}
.main-div > h2 {
  display: flex;
  justify-content: center;
  align-content: center;
} */
.container {
  background-color: #fff;
  border-radius: 8px;
  padding: 100px;
}
.error {
  color: red;
}
#login-button {
  background: lightblue;
}
#hide-pw-btn {
  background: lightcoral;
}
</style>