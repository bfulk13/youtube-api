<template>
  <div>
    <h1 v-if="!valid">Please login to see content</h1>
    <form @submit="checkForm" novalidate="true">
      <!-- #v-if directive -->
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <!-- #list -->
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="container" id="app">
        <p>
          <label for="email">Email</label>
          <!-- #v-model directive -->
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
          >
        </p>
        <p>
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            :type="passwordView ? 'text' : 'password'"
            required
          >
        </p>
          <button
            type="button"
            class="button is-text is-small"
            aria-describedby="password-label"
            @click.prevent="passwordView = !passwordView"
          >{{ passwordView ? 'Hide' : 'Display' }}</button>

          <button type="submit" :disabled="!email || !password">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import hero from '~/components/hero.vue'
import { mapMutations } from 'vuex';

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    hero
  },

  data() {
    return {
      errors: [],
      email: '',
      password: '',
      passwordView: false,
      valid: false
    }
  },

  middleware: 'authenticated',

  methods: {
    checkForm(e) {
      e.preventDefault();

      this.errors = [];

      if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.validPassword(this.password)) {
        this.errors.push('Password must contain 1 capital letter, 1 lower case letter, 1 number, and between 6-10 characters');
      }

      if (!this.errors.length) {
        this.valid = true;
        this.login();
        return true;
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
      if(this.valid){
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
.container {
  background-color: #fff;
  border-radius: 8px;
  padding: 100px;
}
.error {
  color: red;
}
.button {
  transition: all 200ms ease;
}
</style>