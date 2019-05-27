<template>
  <div>
    <h1 v-if="!valid">Please login to see content</h1>
    <form @submit="checkForm" novalidate="true">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="container" id="app">
        <p>
          <label for="email">Email</label>
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
  methods: {
    checkForm(e) {
      e.preventDefault();

      this.errors = [];

      if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.validPassword(this.password)) {
        this.errors.push('Password must contain 1 capital letter, 1 lower case letter, 1 number, and is between 6-10 characters');
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
        setTimeout(() => {
            this.$router.push('/search')
        }, 1500)
      }
    }
    // async logout() {
    //   try {
    //     setTimeout(() => {

    //     }, 1500)
    //   } catch (e) {
    //     console.log(e.message)
    //   }
    // }
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
  transition: all 150ms ease;
}
</style>