<template>
  <div id="app">
      <keep-alive>
        <router-view :key="$route.fullPath"/>
      </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  @import url(./public/style/common.css);

  #app {
      position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
  }

  body {
    background-color: #f0f0f0;
  }

</style>
