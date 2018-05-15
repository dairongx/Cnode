<template>
    <div class="users">
        <v-head txt="个人中心" :show="headerShow"></v-head>
        <div class="user">
            <div class="user_info">
                <div class="no_login" v-if="isLogin" @click="login">
                    <a href="JavaScript:;" class="clear">
                        <div class="left">
                            <img src="../../public/images/a.png" alt="">
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
                            <i class="icon-right-arrow"></i>
                        </div>
                    </a>
                </div>
            </div>
            <div class="self">
                <div class="mark">
                    <a href="javascript:;" @click="$router.push('/collect')">
                        <i class="icon-collect"></i><span>我的收藏</span>
                        <span class="num">{{topic_collect}}</span>
                    </a>
                </div>
                <div class="msg">
                    <a href="javascript:;" @click="$router.push('/msg')">
                        <i class="icon-email"></i><span>我的消息</span>
                        <span class="num">{{msg_count}}</span>
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
                headerShow: false,
                topic_collect: 0,
                msg_count: 0
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
            ...mapState(['accesstoken', 'loginName', 'avatar_url', 'user_id']),
        },
        components: {
            vHead,
            vFooter
        },
        activated() {
            const that = this;
            if(that.loginName){
                that.collect();
                that.msg();
            }
        },
        methods: {
            login() {
                this.$router.push('/login');
            },
            userInfo() {
                this.$router.push('/userInfo/' + this.loginName);
            },
            collect() {
                let url = '/api/v1/topic_collect/' + this.loginName;
                this.axios.get(url)
                    .then(res => {
                        this.topic_collect = res.data.data.length;
                    })
            },
            msg(){
                let url = '/api/v1/message/count';
                this.axios.get(url,{
                    params:{
                        accesstoken: this.accesstoken
                    }
                })
                    .then(res => {
                        this.msg_count = res.data.data;
                    })
            }
        }
    }

</script>

<style lang="less" scoped>
    .users {
        position: absolute;
        top: 51px;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .user {
        min-height: calc(100vh - 51px - 46px);
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
                width: 100%;
                height: 100%;
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

    .self {
        text-align: left;
        background-color: #fff;
        padding: 0 2.7%;
        & > div {
            width: 100%;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #f7eded;
            margin-bottom: 3px;
            a {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                color: #333;
                i {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    font-size: 24px;
                    line-height: 40px;
                    text-align: center;
                    vertical-align: top;
                }
                span {
                    display: inline-block;
                    height: 40px;
                    vertical-align: middle;
                }
                span:nth-of-type(2) {
                    position: absolute;
                    top: 0;
                    right: 40px;
                }
            }

        }
    }
</style>