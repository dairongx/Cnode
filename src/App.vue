<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style>
    #app {
        position: relative;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: calc(100vh - 51px);
    }

    body {
        background-color: #f0f0f0;
    }

</style>
