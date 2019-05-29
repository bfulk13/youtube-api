<template>
  <div class="vidArray-container">
    <ul v-for="item in items" :key="index">
      <li>{{$store.state.items}}</li>
    </ul>
  </div>
</template>

<script>
import vuex from 'vuex'

export default {
  data() {
    return {
      items: []
    }
  }
}
</script>

<style scoped>
</style>