<template>
    <div>
        <v-header txt="个人中心"></v-header>
        <div class="user">
            user
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from '@/components/header2'
    import vFooter from '@/components/footer'

    export default {
        data() {
            return {}
        },
        components: {
            vHeader,
            vFooter
        }
    }

</script>

<style lang="less" scoped>
    .user {
        min-height: calc(100vh - 51px - 46px);
        padding-top: 51px;
        background-color: #fff;
    }
</style>