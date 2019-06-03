<template>
  <div class="vidArray-container">
    <h3 class="search-result">Favorites</h3>
    <div v-for="video in $store.state.favorites">
      <fav-card
        style="width: 400px;"
        :video="video"
        :key="video.id.videoId"
      />
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import favCard from '~/components/favCard'

export default {
  components: {
    favCard
  },
  middleware: 'searchFav',
  methods: {},
  computed: {
    getFavArray() {
      return this.$store.getters.getFavArray
    }
  }
}
</script>

<style scoped>
.vidArray-container {
  margin: 0 2rem 0 0;
}
.search-result {
  margin: 2rem;
}
</style>

