<template>
  <div>
    <h1>Search Route</h1>
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

  //   data() {
  //     return {
  //       id: this.$route.params.id
  //     }
  //   },
  //   computed: {
  //     searchByKeyword() {
  //       var results = YouTube.Search.list('id,snippet', {
  //         q: 'dogs',
  //         maxResults: 10
  //       })
  //       for (var i in results.items) {
  //         var item = results.items[i]
  //         Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title)
  //       }
  //     }
  //   }
}
</script>

<style scoped>
</style>
