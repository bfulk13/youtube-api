<template>
  <div>
    <iframe :src="favMainVidUrl" style="height: 600px; width: 900px;"></iframe>
    <h2 class="video-title">{{getFavArray > 0 ? getCurrFavObj.snippet.title : ''}}</h2>
    <p class="video-description">{{getFavArray > 0 ? getCurrFavObj.snippet.description : ''}}</p>
    <v-btn @click="changeFav(getCurrFavObj)" flat>
      <i class="material-icons">{{ getFavArray.length > 0 ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {}
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
    },
    getFavArray() {
      return this.$store.getters.getFavArray
    }
  },
  created() {
    this.$bus.$on('favFavChange', () => {
      return this.$store.getters.getFavArray, this.$store.getters.getCurrFavObj
    })
    this.$bus.$on('favChange', () => {
      return this.$store.getters.getCurrFavObj
    })
  }
}
</script>

<style scoped>
.video-title {
  margin: 20px;
}

.video-description {
  margin: 20px;
}
</style>