<template>
  <div class="container">
    <form class="search-form" @submit.prevent="submit">
      <v-text-field type="text" placeholder="Search..." v-model="textSearch" fluid></v-text-field>
      <i class="material-icons" @click="logSearch">search</i>
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
  width: 300px;
}
.material-icons {
  cursor: pointer;
}
</style>