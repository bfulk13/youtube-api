<template>
  <v-layout column>
    <v-flex xs12 sm6 offset-sm3>
      <v-card max-width="300px">
        <v-img :src="thumbnail" class="--text" height="200px">
          {{thumbnail}}
        </v-img>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{title}}</div>
          </div>
        </v-card-title primary-title>
        <v-card-actions>
          <v-btn flat>Like</v-btn>
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
  props: ['title', 'description', 'videoId', 'thumbnail'],
  data: () => ({
      show: false
    })
}
</script>

<style scoped>
</style>