<template>
  <div>
    <iframe :src="mainVidUrl" style="height: 60rem; width: 90rem;"></iframe>
    <h2 style="margin: 2rem;">{{getVidProps.snippet.title}}</h2>
    <p style="margin: 2rem;">{{getVidProps.snippet.description}}</p>
    <v-btn @click="changeFav(getVidProps)" flat>
      <i class="material-icons">{{ getVidProps.fav ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {
      compVid: {}
    }
  },
  methods: {
    changeFav(video) {
      video.fav
        ? this.$store.commit('REMOVE_FAV', video)
        : this.$store.commit('ADD_FAV', video)
    }
  },
  computed: {
    mainVidUrl() {
      return `http://www.youtube.com/embed/${this.$store.getters.getFavMainVid}`
    },
    getVidProps() {
      let getVid = this.$store.getters.getVidProps[0]
      this.compVid = { ...this.compVid, getVid }
      return getVid
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.getVidProps,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`)
        this.icon = !this.icon
      },
      { immediate: true }
    )
  }
}
</script>

<style scoped>
</style>