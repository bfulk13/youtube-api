<template>
  <div class="vidArray-container">
    Filter by:
    <form @submit.prevent="handleFilter">
      <!-- #inline style -->
      <select style="font-size: 18px;" v-model="filter">
        <option value="title">Title</option>
        <option value="date">Recent</option>
        <option value="length short">Short Video Length</option>
        <option value="length long">Long Video Length</option>
      </select>
    </form>
    <h3 class="search-result">Favorites:</h3>

    <!-- #list and keys along with #inline styling -->

    <div v-for="video in favArray" :key="video.id.videoId">
      <fav-card
        style="width: 400px;"
        :video="video"
        :videoId="video.id.videoId"
        :thumbnail="video.snippet.thumbnails.medium.url"
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
      filter: 'date',
      favArray: []
    }
  },
  components: {
    favCard
  },
  computed: {
    ...mapGetters(['filterOrder', 'filterFavs', 'getFavArray'])
  },
  methods: {
    handleFilter: function(val) {
      switch (val) {
        case 'title':
          this.$store.commit('ORDER_BY_TITLE')
          break
        case 'date':
          this.$store.commit('ORDER_BY_DATE')
          break
        case 'length short':
          this.$store.commit('ORDER_LENGTH_SHORT')
          break
        case 'length long':
          this.$store.commit('ORDER_LENGTH_LONG')
          break
        default:
          break
      }
    }
  },
  created() {
    ;(this.favArray = this.$store.getters.getFavArray),
      this.$bus.$on('favFavChange', () => {
        return (this.favArray = this.$store.getters.filterFavs)
      }),
      this.$bus.$on('favMainFavChange', () => {
        return (this.favArray = this.$store.getters.filterFavs)
      }),
      this.$bus.$on('filterFavs', () => {
        this.favArray = this.$store.getters.filterFavs
      })
  },
  watch: {
    // #async/await function -- promise
    filter: async function(newVal, oldVal) {
      await this.handleFilter(newVal)
      this.favArray = this.$store.getters.filterOrder
    }
  }
}
</script>

<style scoped>
/* #scoped style */
.vidArray-container {
  margin: 0 20px 0 0;
}
.search-result {
  margin: 20px;
}
</style>

