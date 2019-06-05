<template>
  <div>
    <iframe :src="favMainVidUrl" style="height: 60rem; width: 90rem;"></iframe>
    <!-- <h2 style="margin: 2rem;">{{getFavVidProps.snippet.title}}</h2> -->
    <!-- <p style="margin: 2rem;">{{getFavVidProps.snippet.description}}</p> -->
    <!-- <v-btn @click="changeFav(getFavVidProps)" flat>
      <i class="material-icons">{{ getFavVidProps.fav ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>-->
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {
      currVid: {},
      fav: true
    }
  },
  methods: {
    changeFav(video) {
      this.$bus.$emit(
        'favMainFavChange',
        this.$store.commit('REMOVE_FAV', video)
      )
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
  created() {
    this.$bus.$on('favFavChange', () => {
      return this.$store.getters.getFavArray
    })
  }
}
</script>

<style scoped>
</style>