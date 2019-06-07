<template>
  <div>
    <nav class="main-nav">
      <span class="links">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/search">Search</nuxt-link>
        <nuxt-link to="/favorites">Favorites</nuxt-link>
      </span>
    </nav>
    <div class="header-container">
      <h1>STG YouTuber</h1>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.main-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-container > h1 {
  margin: 10px;
  font-size: 30px;
}

.links {
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
}

.links > * {
  text-decoration: none;
  margin: 10px 20px;
}
</style>
