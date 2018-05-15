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
        <div class="recent">
            <ul class="recent_tab clear">
                <li @click="toggle('recent_replies')" :class="[recent==='recent_replies'? 'active': '']">最近回复</li>
                <li @click="toggle('recent_topics')" :class="[recent==='recent_topics'? 'active': '']">最近发布</li>
            </ul>
            <div class="recent_replies recent_info" v-show="recent==='recent_replies'">
                <ul class="recent_replies_list" v-if="userInfo.recent_replies.length!==0">
                    <li v-for="item in userInfo.recent_replies" class="clear">
                        <div class="left">
                            <img :src="item.author.avatar_url" alt="">
                        </div>
                        <div class="left">
                            <div>
                                <span class="left">{{item.author.loginname}}</span>
                                <span class="right">{{item.last_reply_at | date}}</span>
                            </div>
                            <h3>{{item.title}}</h3>
                        </div>
                    </li>
                </ul>
                <div class="no" v-else>
                    <img src="../../public/images/no.png" alt="">
                    <p>暂无数据</p>
                </div>
            </div>
            <div class="recent_topics recent_info" v-show="recent==='recent_topics'">
                <ul class="recent_topics_list" v-if="userInfo.recent_topics.length!==0">
                    <li v-for="item in userInfo.recent_topics" class="clear">
                        <div class="left">
                            <img :src="item.author.avatar_url" alt="">
                        </div>
                        <div class="left">
                            <div>
                                <span class="left">{{item.author.loginname}}</span>
                                <span class="right">{{item.last_reply_at | date}}</span>
                            </div>
                            <h3>{{item.title}}</h3>
                        </div>
                    </li>
                </ul>
                <div class="no" v-else>
                    <img src="../../public/images/no.png" alt="">
                    <p>暂无数据</p>
                </div>
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
                loading: true,
                recent: 'recent_replies'
            }
        },
        computed: {
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
                this.loading = true;
                let url = '/api/v1/user/' + this.$route.params.user;
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
            },
            toggle(val) {
                this.recent = val;
            }
        }
    }
</script>

<style lang="less" scoped>
    .userInfo {
        min-height: 100vh;
        background-color: #fff;
        .info_list {
            padding: 0 2.7%;
            margin-top: 51px;
            color: #fff;
            background: url(../../public/images/bg.jpg) no-repeat center center;
            .avatar_url {
                padding: 20px 0;
                text-align: center;
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
                a{
                    color: #00f4ff;
                    text-decoration: underline;
                }
            }
            & > .clear {
                margin-top: 10px;
                font-size: 13px;
                .left {
                    padding-left: 18px;
                }
                .right {
                    padding-right: 18px;
                    span {
                        color: #46ff09;
                    }
                }
            }
        }
    }

    .recent {
        padding: 0 2.7%;
        .recent_tab {
            border-top: 1px solid #e2e2e2;
            border-bottom: 1px solid #e2e2e2;
            margin-bottom: 10px;
            li {
                float: left;
                width: 50%;
                height: 45px;
                line-height: 45px;
                text-align: center;
                font-size: 14px;
                &.active{
                    border-bottom: 2px solid #6d93cc;
                }
            }
        }
        .recent_info {
            li {
                margin-top: 5px;
                padding-bottom: 5px;
                border-bottom: 1px solid #e2e2e2;
                & > .left:nth-of-type(1) {
                    width: 45px;
                    height: 45px;
                    margin: 0 15px;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                & > .left:nth-of-type(2) {
                    width: calc(100% - 75px);
                    div {
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        font-size: 13px;
                        color: #666;
                    }
                    h3 {
                        padding: 10px 0;
                        line-height: 18px;
                        font-size: 15px;
                        text-align: left;
                    }
                }
            }
            .no{
                width: 150px;
                height: 150px;
                margin: 20px auto;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>