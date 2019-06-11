<template>
  <div class="vidArray-container">
    <h3 class="search-result">Results for: {{ $route.params.id || 'funny' }}</h3>
    <div v-for="video in $store.state.vidArray" :key="video.id.videoId">
      <card
        style="width: 400px;"
        :video="video"
        :title="video.snippet.title"
        :description="video.snippet.description"
        :videoId="video.id.videoId"
        :thumbnail="video.snippet.thumbnails.medium.url"
      />
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import card from '~/components/card'

export default {
  components: {
    card
  },
  middleware: 'search',
  methods: {},
  computed: {}
}
</script>

<style scoped>
.vidArray-container {
  margin: 0 20px 0 0;
}
.search-result {
  margin: 20px;
}
</style>