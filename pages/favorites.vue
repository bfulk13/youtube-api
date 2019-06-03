<template>
  <div>
    <h1>Favorites Route</h1>
    <button @click="logout">Logout</button>
    <favSearch/>
    <favMainView/>
    <favSidebar/>
  </div>
</template>

<script>
import favSearch from '~/components/favSearch'
import favMainView from '~/components/favMainView'
import favSidebar from '~/components/favSidebar'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    favSearch,
    favMainView,
    favSidebar
  },
  middleware: 'notAuthenticated',
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
