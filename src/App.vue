<template>
  <div id="app">
      <keep-alive>
        <router-view class="a" :key="$route.fullPath"/>
      </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App',
    /*computed: {
      animateType: function () {
        console.log(this.$store);
        return this.$store.state.animateType;
      }
    }*/
  }
</script>

<style>
  @import url(./public/style/common.css);

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
  }

  /*.a {
    transition: all 2s ease-out;
  }*/

  body {
    background-color: #f0f0f0;
  }

  .left-enter-active,.right-enter-active,.left-leave-active,.right-leave-active{
      transition: all 0.2s ease;
  }

  .left-enter, .right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .right-enter, .left-leave-active {
    opacity: 0;
    transform: translate(-100%, 0);
  }
</style>
