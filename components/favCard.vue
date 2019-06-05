<template>
  <v-layout column>
    <v-flex xs12 sm5 md5 offset-sm3>
      <v-card class="vidCard" max-width="300px" @mouseover="mouseOver" @mouseout="mouseOut" @click="selectVid(videoId)">
        <v-img :src="thumbnail" class="--text" height="200px" >
          {{thumbnail}}
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{video.snippet.title}}</div>
          </div>
        </v-card-title primary-title>
        <v-card-actions>
          <v-btn @click.stop="changeFav(video)" flat>
            <i class="material-icons" v-show="active">{{ video.fav ? 'favorite' : 'favorite_border' }}</i>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
              {{video.snippet.description}}
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['video', 'thumbnail', 'videoId'],
  data: () => ({
      show: false,
      active: false,
      fav: true
  }),
  methods: {
    selectVid(vidId){
      this.$store.commit('SET_FAV_MAIN_VID', vidId)
    },
    changeFav(video){
      this.$bus.$emit('favFavChange',
      this.$store.commit('REMOVE_FAV', video))
    },
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
    this.$bus.$on('favMainFavChange', () => {
      return this.$store.getters.getFavArray
    })

  }
}
</script>

<style scoped>
.vidCard:hover {
  cursor: pointer;
}
</style>