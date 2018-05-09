<template>
    <div>
        <v-head txt="发表" :show="headerShow"></v-head>
        <div class="publish">
            <no-login :show="isLogin"></no-login>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHead from '@/components/header2'
    import vFooter from '@/components/footer'
    import noLogin from '@/components/isLogin'

    export default {
        date() {
            return {
                headerShow: false
            }
        },
        computed: {
            isLogin() {
                if (this.$store.state.accesstoken) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        components: {
            vHead,
            vFooter,
            noLogin
        }
    }
</script>

<style lang="less" scoped>
    .publish {
        min-height: calc(100vh - 51px - 46px);
        padding: 51px 2.7%;
        background-color: #fff;
    }

</style>