<template>
  <div class="vidArray-container">
    Sort by:
    <form @submit.prevent="handleFilter">
      <select style="font-size: 18px;" v-model="filter">
        <option value="title">Title</option>
        <option value="date recent">Recent</option>
        <option value="date old">Old</option>
        <option value="length short">Short Video Length</option>
        <option value="length long">Long Video Length</option>
      </select>
    </form>
    <h3 class="search-result">Favorites:</h3>
    <div v-for="video in favArray">
      <fav-card
        style="width: 400px;"
        :video="video"
        :videoId="video.id.videoId"
        :thumbnail="video.snippet.thumbnails.medium.url"
        :key="video.id.videoId"
      />
    </div>
  </div>
</template>

<script>
import vuex from 'vuex'
import favCard from '~/components/favCard'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      filter: 'date recent',
      favArray: []
    }
  },
  components: {
    favCard
  },
  mounted() {
    this.favArray = this.$store.getters.getFavArray
  },
  computed: {
    // ...mapGetters([
    //   'sortTitle',
    //   'sortDateOld',
    //   'sortLengthShort',
    //   'sortLengthLong',
    //   'sortDateNew'
    // ]),
    handleFilter: function() {
      switch (this.filter) {
        case 'title':
          return 'sortTitle'
          break
        case 'date recent':
          return 'sortDateNew'
          break
        case 'date old':
          return 'sortDateOld'
          break
        case 'length short':
          return 'sortLengthShort'
          break
        case 'length long':
          return 'sortLengthLong'
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped>
.vidArray-container {
  margin: 0 20px 0 0;
}
.search-result {
  margin: 20px;
}
</style>

