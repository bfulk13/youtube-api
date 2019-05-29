<template>
  <div class="vidArray-container">
    <h3 class>Results for: {{ $route.params.id }}</h3>
    <div v-for="(video, index) in $store.state.vidArray">
      <card
        :title="video.snippet.title"
        :description="video.snippet.description"
        :videoId="video.id.videoId"
        :thumbnail="video.snippet.thumbnails.medium.url"
        :color="picker(index)"
        :key="video.id.videoId"
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
  methods: {
    picker(index) {
      return index % 2 == 0 ? '#777' : '#DDD'
    }
  },
  computed: {
    vidArrayExists() {
      return vidArray.length > 0
    }
  }
}
</script>

<style scoped>
</style>