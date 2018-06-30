<template>
    <div class="index">
        <v-header></v-header>

        <keep-alive>
            <router-view class="child" v-if="$route.meta.keepAlive" :key="$route.fullPath"/>
        </keep-alive>
        <router-view class="child" v-if="!$route.meta.keepAlive" :key="$route.fullPath"/>

        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from '@/components/header'
    import vFooter from '@/components/footer'

    export default {
        components: {
            vHeader,
            vFooter
        }
    }

</script>

<style lang="less" scoped>
    .index {
        position: relative;
        width: 100%;
        height: 100vh;
    }
</style>