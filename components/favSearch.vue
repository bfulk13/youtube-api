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
      return this.cleanText(this.searchFavs)
    },
    cleanText(text) {
      let txt = text.toLowerCase().trim()
      txt = txt.replace(/ +/g, '')
      return txt
    },
    submit(e) {

    }
  },
  computed: {
    getFilteredFavs() {
      let newArr = []
      favArr.filter(vid => {
        const { title, description } = vid.snippet
        const { videoId } = vid.id
        title.includes(this.searchFavs) && newArr.push(vid)
        description.includes(this.searchFavs) && newArr.push(vid)
        videoId.includes(this.searchFavs) && newArr.push(vid)
      })
      return newArr
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