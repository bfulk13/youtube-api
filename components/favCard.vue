<template>
  <v-layout column>
    <v-flex xs12 sm5 md5 offset-sm3>
      <v-card class="vidCard" max-width="300px" @mouseover="mouseOver" @mouseout="mouseOut" @click="selectVid(videoId)">
        <v-img :src="thumbnail" class="--text" height="200px" >
          {{thumbnail}}
        </v-img>
        <v-card-title primary-title>
          <p>{{video.length}}</p>
          <div>
            <div class="headline">{{video.snippet.title}}</div>
          </div>
        </v-card-title primary-title>
        <v-card-actions>
          <v-btn @click.stop="changeFav(video)" flat>
            <i class="material-icons" v-show="active">{{ 'favorite' }}</i>
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
      active: false
  }),
  methods: {
    selectVid(vidId){
      // #Currying and closure
      this.$store.commit('SET_FAV_MAIN_VID', vidId)
    },
    changeFav(video){
      this.$bus.$emit('favFavChange',
      this.$store.commit('REMOVE_FAV', video))
      return this.$store.getters.getFavArray
    },
    mouseOver(){
      this.active = !this.active
    },
    mouseOut(){
      this.active = !this.active
    }
  },
  computed: {
    // #computed properties are form of memoization
    getFavVidProps(){
      return this.$store.getters.getFavVidProps
    }
  },
  // #Lifecycle hook
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