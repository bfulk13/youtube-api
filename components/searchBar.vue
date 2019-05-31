<template>
  <div class="container">
    <form class="search-form" @submit.prevent="submit">
      <v-text-field type="text" placeholder="Search..." v-model="textSearch" fluid></v-text-field>
      <v-spacer></v-spacer>
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
      if (this.textSearch) {
        let search = this.cleanText(this.textSearch)
      } else {
        let search = 'basketball'
      }
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
.material-icons {
  cursor: pointer;
}
</style>