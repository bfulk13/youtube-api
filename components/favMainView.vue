<template>
  <div>
    <iframe :src="favMainVidUrl" style="height: 600px; width: 900px;"></iframe>
    <h2 class="video-title">{{favObj.snippet.title || ''}}</h2>
    <p class="video-description">{{favObj.snippet.description || ''}}</p>
    <v-btn @click="changeFav(favObj)" flat>
      <i class="material-icons">{{ getFavArray.length > 0 ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>
  </div>
</template>

<script>
import Vuex from 'vuex'

export default {
  data: () => {
    return {
      favObj: {}
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
  mounted() {
    // #Lifecycle hook
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
  // #Lifecycle hook
  created() {
    ;(this.favObj = this.$store.getters.getCurrFavObj),
      this.$bus.$on('favFavChange', () => {
        return (this.favObj = this.$store.getters.getCurrFavObj)
      })
    this.$bus.$on('favChange', () => {
      return (this.favObj = this.$store.getters.getCurrFavObj)
    })
  },
  watch: {}
}
</script>

<style scoped>
.video-title {
  margin: 20px;
  color: #111;
}

.video-description {
  margin: 20px;
  color: #111;
}
</style>