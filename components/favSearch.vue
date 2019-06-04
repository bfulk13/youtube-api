<template>
  <div class="container">
    <form class="search-form" @submit.prevent="submit">
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
    filterFavs() {
      let search = this.cleanText(this.searchFavs)
    },
    cleanText(text) {
      let txt = text.toLowerCase().trim()
      txt = txt.replace(/ +/g, '')
      return txt
    },
    submit(e) {
      let favArr = this.$store.getters.getFavArray
      let filterAll = favArr.filter(fav => {
        toLowerCase().includes(this.searchFavs.toLowerCase())
      });
      let filterDate = fav
    }
  },
  computed: {
    getFavArray(){
      return this.$store.getters.getFavArray
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
  width: 30rem;
}
.material-icons {
  cursor: pointer;
}
</style>