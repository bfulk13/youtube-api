<template>
  <div class="container">
    <form class="search-form" @submit.prevent="submit">
      <input type="text" placeholder="search" v-model="textSearch" autofocus>
      <v-icon class="searchbar-icon" @click="logSearch">fas fa-search</v-icon>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      textSearch: ''
    }
  },
  methods: {
    logSearch() {
      let search = this.cleanText(this.textSearch)
    },
    cleanText(text) {
      let txt = text.toLowerCase().trim()
      txt = txt.replace(/ +/g, '')
      return txt
    },
    submit(e) {
      this.$router.push(`/search/${this.textSearch}`)
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
</style>