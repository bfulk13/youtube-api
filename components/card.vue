<template>
  <v-layout column>
    <v-flex xs12 sm5 md5 offset-sm3>
      <v-card class="vidCard" max-width="300px" @mouseover="mouseOver" @mouseout="mouseOut" @click="selectVid(videoId)">
        <v-img :src="thumbnail" class="--text" height="200px" >
          {{thumbnail}}
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{title}}</div>
          </div>
        </v-card-title primary-title>
        <v-card-actions>
          <v-btn @click.stop="changeFav(video)" flat>
            <i class="material-icons" v-show="active">{{ fav || video.fav  ? 'favorite' : 'favorite_border' }}</i>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
              {{description}}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Vuex, { mapActions } from 'vuex'

export default {
  props: ['title', 'description', 'videoId', 'thumbnail', 'video'],
  data: () => ({
      show: false,
      active: false,
      fav: false
  }),
  methods: {
    selectVid(vidId){
      this.$store.commit('SET_MAIN_VID', vidId)
    },
    changeFav(video){
      this.fav = !this.fav
      this.$bus.$emit(
        'favChange',
        (this.video.fav
        ? (this.$store.commit('REMOVE_FAV', video), (this.fav = false))
        : (this.$store.commit('ADD_FAV', video),
          this.fav = true,
          this.$store.dispatch('setVidLength', video.id.videoId))))
    },
    ...mapActions([
      'setVidLength(video.id.videoId)',
    ]),
    mouseOver(){
      this.active = !this.active
    },
    mouseOut(){
      this.active = !this.active
    }
  },
  computed: {
    getVidProps(){
      return this.$store.getters.getVidProps
    }
  },
  created(){
    this.$bus.$on('mainFavChange', () => {
      this.fav = this.$store.getters.getVidProps.fav
      return this.$store.getters.getVidProps
    })
  }
}
</script>

<style scoped>
.vidCard:hover {
  cursor: pointer;
}
.material-icons {

}
</style>