<template>
  <div>
    <iframe :src="favMainVidUrl" style="height: 60rem; width: 90rem;">
      <span class="display-time">{{}}</span>
    </iframe>
    <!-- <h2 style="margin: 2rem;">{{favChange.snippet.title}}</h2>
    <p style="margin: 2rem;">{{favChange.snippet.description}}</p>
    <v-btn @click="changeFav(favChange)" flat>
      <i class="material-icons">{{favChange.fav ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>-->
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {
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
    getCurrFavObj() {
      return this.$store.getters.getCurrFavObj
    }
  },
  created() {
    this.$bus.$on('favFavChange', () => {
      return this.$store.getters.getFavArray
    })
    this.$bus.$on('favChange', () => {
      return this.$store.getters.getCurrFavObj
    })
  }
}
</script>

<style scoped>
</style>