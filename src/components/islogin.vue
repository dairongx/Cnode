<template>
    <div v-if="show">
        <p>你还未登录，请先 <a href="JavaScript:;">登录</a></p>
    </div>
</template>

<script>
    export default {
        props: ['show']
    }
</script>

<style lang="less" scoped>
    div{
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        p{
            font-size: 14px;
            color: #000;
            a{
                color: #80bd01;
            }
        }
    }
</style>