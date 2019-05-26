<template>
 <nav class="main-nav">
   <div class="header-container">
     <h1>STG YouTuber</h1>
   </div>
 </nav>
</template>

<script>
export default {}
</script>

<style>
.main-nav {
 display: flex;
 justify-content: center;
 align-items: center;
}

.header-container {
 display: flex;
 justify-content: center;
 align-items: center;
}

.header-container > h1 {
 margin: 1rem;
 font-size: 3rem;
}

.links {
 display: flex;
 justify-content: flex-end;
 font-size: 2rem;
}

.links:nth-child() {
 margin: 0 2rem;
}
</style>
