<template>
  <div>
    <iframe :src="mainVidUrl" style="height: 600px; width: 900px;"></iframe>
    <h2 style="margin: 20px;">{{getVidProps.snippet.title}}</h2>
    <p style="margin: 20px;">{{getVidProps.snippet.description}}</p>
    <v-btn @click="changeFav(getVidProps)" flat>
      <i class="material-icons">{{ fav || getVidProps.fav ? 'favorite' : 'favorite_border' }}</i>
    </v-btn>
  </div>
</template>

<script>
import Vuex, { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      fav: false
    }
  },
  methods: {
    changeFav(video) {
      this.$bus.$emit(
        'mainFavChange',
        // or is `this.video.fav` ?
        video.fav
          ? (this.$store.commit('REMOVE_FAV', video), (this.fav = false))
          : (this.$store.commit('ADD_FAV', video),
            (this.fav = true),
            this.$store.dispatch('setVidLength', video.id.videoId))
      )
    }
  },
  ...mapActions(['setVidLength(video.id.videoId)']),
  computed: {
    mainVidUrl() {
      return `http://www.youtube.com/embed/${this.$store.getters.mainVidId}`
    },
    getVidProps() {
      this.fav = this.$store.getters.getVidProps[0].fav || false
      return this.$store.getters.getVidProps[0]
    }
  },
  created() {
    this.$bus.$on('favChange', () => {
      this.fav = this.$store.getters.getVidProps[0].fav || false
      return this.$store.getters.getVidProps[0]
    })
  }
}
</script>

<style scoped>
</style>