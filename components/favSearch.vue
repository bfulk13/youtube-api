<template>
  <div class="container">
    <form class="search-form" @submit.prevent="filterFavs(searchFavs)">
      <v-text-field type="text" placeholder="Search Favorites..." v-model="searchFavs" fluid></v-text-field>
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
    cleanText(text) {
      let txt = text.toLowerCase().trim()
      txt = txt.replace(/ +/g, '')
      return txt
    },
    filterFavs(search) {
      this.cleanText(search)
      this.$bus.$emit(
        'filterFavs',
        search && this.$store.commit('FILTER_FAVS', search)
      )
    }
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
  width: 300px;
}
.material-icons {
  cursor: pointer;
}
</style>