<template>
    <div>
        <v-header></v-header>

        <keep-alive>
            <router-view class="child" :key="$route.fullPath"/>
        </keep-alive>

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

</style>