<template>
    <div class="message">
        <v-head txt="消息" :show="headerShow"></v-head>
        <div class="msg">
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
    .message{
        position: absolute;
        top: 51px;
        left: 0;
        bottom: 0;
        width: 100%;
    }
    .msg {
        height: 100%;
        padding: 0 2.7%;
        background-color: #fff;
    }

</style>