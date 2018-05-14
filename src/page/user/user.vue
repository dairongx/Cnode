<template>
    <div>
        <v-head txt="个人中心" :show="headerShow"></v-head>
        <div class="user">
            <div class="user_info">
                <div class="no_login" v-if="isLogin" @click="login">
                    <a href="JavaScript:;" class="clear">
                        <div class="left">
                            <img src="../../assets/a.png" alt="">
                        </div>
                        <div class="left">
                            <span>未登录</span>
                        </div>
                        <div class="right">
                            <i class="icon-right-arrow"></i>
                        </div>
                    </a>
                </div>
                <div class="info" v-else @click="userInfo">
                    <a href="JavaScript:;" class="clear">
                        <div class="left">
                            <img :src="avatar_url" alt="">
                        </div>
                        <div class="left">
                            <span>{{loginName}}</span>
                        </div>
                        <div class="right">
                            <span> > </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHead from '@/components/header2'
    import vFooter from '@/components/footer'
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                imgSrc: '../../assets/a.png',
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
            },
            ...mapState(['loginName', 'avatar_url', 'user_id'])
        },
        components: {
            vHead,
            vFooter
        },
        methods: {
            login() {
                this.$router.push('/login');
            },
            userInfo() {
                this.$router.push('/userInfo')
            }
        }
    }

</script>

<style lang="less" scoped>
    .user {
        min-height: calc(100vh - 51px - 46px);
        padding-top: 51px;
        background-color: #fbfbfb;
        .no_login, .info {
            text-align: left;
            width: 100%;
            height: 50px;
            line-height: 50px;
            margin: 10px 0;
            padding: 10px 0;
            background-color: #fff;
            a {
                display: block;
                color: #000;
                & > div {
                    height: 50px;
                }
                & > div:nth-child(1) {
                    width: 50px;
                    border-radius: 50%;
                    margin: 0 20px 0 45px;
                    overflow: hidden;
                }
                div.right {
                    margin-right: 40px;
                    font-size: 18px;
                }
            }
        }
    }
</style>