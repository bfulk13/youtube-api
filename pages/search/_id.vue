<template>
  <div>
    <h1>Search Route</h1>
    <button @click="logout">Logout</button>
    <searchBar/>
    <mainView/>
    <h3>{{ $route.params.id }}</h3>
    <sidebar/>
  </div>
</template>

<script>
import searchBar from '~/components/searchBar'
import sidebar from '~/components/sidebar'
import mainView from '~/components/mainView'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
  components: {
    searchBar,
    sidebar,
    mainView
  },
  middleware: ['notAuthenticated', 'search'],
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
