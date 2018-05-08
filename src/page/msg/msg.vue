<template>
    <div>
        <v-header txt="消息"></v-header>
        <login></login>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from '@/components/header2'
    import vFooter from '@/components/footer'
    import login from '@/components/isLogin'

    export default {
        components:{
            vHeader,
            vFooter,
            login
        }
    }
</script>

<style>

</style>