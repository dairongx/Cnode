<template>
    <div><span>{{txt}}</span></div>
</template>

<script>
    export default {
        name: 'header',
        props: ['txt']
    }
</script>

<style scoped>
    div{
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #000;
        font-size: 18px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        z-index: 99;
    }
</style>