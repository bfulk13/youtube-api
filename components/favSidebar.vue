<template>
  <div class="vidArray-container">
    Sort by:
    <filter-options style="font-size: 1.6rem"/>
    <h3 class="search-result">Favorites:</h3>
    <div v-for="video in $store.state.favorites">
      <fav-card
        style="width: 400px;"
        :video="video"
        :videoId="video.id.videoId"
        :thumbnail="video.snippet.thumbnails.medium.url"
        :key="video.id.videoId"
      />
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import favCard from '~/components/favCard'
import filterOptions from '~/components/filterOptions'

export default {
  components: {
    favCard,
    filterOptions
  },
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

