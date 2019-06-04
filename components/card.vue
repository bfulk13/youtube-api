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
            <i class="material-icons" v-show="active">{{ fav || video.fav ? 'favorite' : 'favorite_border' }}</i>
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
      this.$bus.$emit('favChange', (this.video.fav
        ? this.$store.commit('REMOVE_FAV', video)
        : this.$store.commit('ADD_FAV', video)))
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
  mounted() {
    this.$store.watch(
      (state, getters) => getters.getVidProps,
      (newValue, oldValue) => {
        console.log(`Updating from ${oldValue} to ${newValue}`)
      },
      {immediate: true}
    )
  },
  created(){
    this.$bus.$on('mainFavChange', () => {
      this.fav = !this.fav
      return this.$store.getters.getVidProps[0]
    })
  }
}
</script>

<style scoped>
.vidCard:hover {
  cursor: pointer;
}
</style>