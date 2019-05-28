<template>
  <div>
    <h1>Favorites Route</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: 'notAuthenticated',
  computed: mapGetters(['loggedUser']),
  methods: {
    logout() {
      // Code will also be required to invalidate the JWT Cookie on external API
      Cookie.remove('user')
      this.$store.commit('SET_USER', null)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
