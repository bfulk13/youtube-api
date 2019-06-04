<template>
  <div>
    <iframe :src="favMainVidUrl" style="height: 60rem; width: 90rem;"></iframe>
    <!-- <h2 style="margin: 2rem;">{{getFavVidProps.snippet.title}}</h2>
    <p style="margin: 2rem;">{{getFavVidProps.snippet.description}}</p>
    <v-btn @click="changeFav(getFavVidProps)" flat>
      <i class="material-icons">{{ getFavVidProps.fav ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>-->
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {
      currVid: {}
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
    favMainVidUrl() {
      return `http://www.youtube.com/embed/${this.$store.getters.getFavMainVid}`
    },
    getFavVidProps() {
      let getVid = this.$store.getters.getFavVidProps[0]
      this.currVid = { ...this.currVid, getVid }
      return getVid
    }
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.getVidProps,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`)
      },
      { immediate: true }
    )
  }
}
</script>

<style scoped>
</style>