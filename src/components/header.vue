<template>
  <div class="header">
    <ul class="clear">
      <li :class="[this.$route.path==='/index/all' ? 'active':'']" @click="go('/index/all')"><a href="javascript:;">首页</a></li>
      <li :class="[this.$route.path==='/index/good' ? 'active':'']" @click="go('/index/good')"><a href="javascript:;">精华</a></li>
      <li :class="[this.$route.path==='/index/share' ? 'active':'']" @click="go('/index/share')"><a href="javascript:;">分享</a></li>
      <li :class="[this.$route.path==='/index/ask' ? 'active':'']" @click="go('/index/ask')"><a href="javascript:;">问答</a></li>
      <li :class="[this.$route.path==='/index/job' ? 'active':'']" @click="go('/index/job')"><a href="javascript:;">招聘</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods:{
      go(path){
        this.$router.push(path);
      }
    }
  }
</script>

<style>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    z-index: 2;
  }
  .header ul li{
    float: left;
    width: 20vw;
    line-height: 50px;
    font-size: 16px;
    background: #fff;
  }
  .header ul li.active{
    border-bottom: 3px solid #6d93cc;
  }
  .header ul li a{
    color: #333;
  }
</style>
