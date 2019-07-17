<template>
  <div>
    <div class="button-container">
    <v-btn class="logout-btn" @click="logout">Logout</v-btn>
    </div>
    <searchBar />
    <mainView style="float: left; margin: 2rem;" />
    <sidebar style="float: right; margin: 2rem" />
  </div>
</template>

<script>
// #Routing in NUXT is setting up files in pages, `_id.vue` is a route with params
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
.button-container {
  display: flex;
}
.logout-btn {
  background: lightblue;
  display: flex;
  justify-content: center;
}
</style>
