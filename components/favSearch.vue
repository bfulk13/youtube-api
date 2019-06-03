<template>
  <div class="container">
    <form class="search-form" @submit.prevent="submit">
      <v-text-field type="text" placeholder="Search..." v-model="searchFavs" fluid></v-text-field>
      <i class="material-icons" @click="filterFavs">search</i>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchFavs: ''
    }
  },
  methods: {
    filterFavs() {},
    cleanText(text) {
      let txt = text.toLowerCase().trim()
      txt = txt.replace(/ +/g, '')
      return txt
    },
    submit(e) {}
  }
}
</script>

<style scoped>
* {
  display: flex;
  justify-content: center;
  align-content: center;
}
input {
  width: 30rem;
}
.material-icons {
  cursor: pointer;
}
</style>