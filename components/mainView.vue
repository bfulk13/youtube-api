<template>
  <div>
    <iframe :src="mainVidUrl" height="600px" width="900px"></iframe>
    <h2>{{getVidProps}}</h2>
    <!-- <p>{{getVidProps.snippet.description}}</p> -->
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  computed: {
    mainVidUrl() {
      return `http://www.youtube.com/embed/${this.$store.getters.mainVidId}`
    },
    getVidProps() {
      return this.$store.getters.getVidProps
    }
  }
}
</script>

<style scoped>
</style>