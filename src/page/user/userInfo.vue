<template>
    <div class="userInfo">
        <v-head txt="用户信息" :show="headerShow"></v-head>
        <div class="info_list">
            <div class="avatar_url">
                <div><img :src="userInfo.avatar_url" alt=""></div>
            </div>
            <div class="info loginname">loginName: <span>{{userInfo.loginname}}</span></div>
            <div v-if="hasGithub" class="info githubUsername">github:<a
                    :href="'https://github.com/'+userInfo.githubUsername">{{userInfo.githubUsername+'@github.com'}}</a>
            </div>
            <div class="info clear">
                <p class="left">注册时间：<span>{{userInfo.create_at | toLocaleDate }}</span></p>
                <p class="right">积分：<span>{{userInfo.score}}</span></p>
            </div>
        </div>
        <loading :show="loading"></loading>
    </div>
</template>

<script>
    import vHead from '@/components/header2'
    import loading from '@/components/loading'

    export default {
        data() {
            return {
                headerShow: true,
                userInfo: null,
                loading: true
            }
        },
        computed: {
            loginName() {
                return this.$store.state.loginName;
            },
            hasGithub() {
                return Boolean(this.userInfo.githubUsername)
            }
        },
        components: {
            vHead,
            loading
        },
        mounted() {
            const that = this;
            that.getInfo();
        },
        methods: {
            getInfo() {
                let url = '/api/v1/user/' + this.loginName;
                this.axios.get(url)
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            this.userInfo = res.data.data;
                            this.loading = false;
                        }
                    }).catch(err => {
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .userInfo {
        min-height: 100vh;
        background-color: #fff;
        .info_list {
            padding: 51px 2.7% 0;
            .avatar_url {
                text-align: center;
                margin: 20px 0;
                div {
                    display: inline-block;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                    }
                }
            }
            .info {
                height: 35px;
                line-height: 35px;
                font-size: 15px;
                span, a {
                    margin-left: 5px;
                }
            }
            .clear {
                margin-top: 10px;
                font-size: 13px;
                .left {
                    padding-left: 18px;
                }
                .right {
                    padding-right: 18px;
                    span {
                        color: #fb7604;
                    }
                }
            }
        }
    }

</style>