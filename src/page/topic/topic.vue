<template>
    <div class="topics">
        <v-head txt="主题" :show="headerShow"></v-head>
        <div class="main">
            <div class="author clear">
                <div class="img left">
                    <img :src="topics.author.avatar_url" alt="">
                </div>
                <div class="left">
                    <span class="name">{{topics.author.loginname}}</span>
                    <span class="time">{{topics.create_at | date}}</span>
                </div>
                <div class="right">
                    <span>#楼主</span>
                </div>
            </div>
            <div class="content">
                <h2>{{topics.title}}</h2>
                <div>
                    <span><i class="icon-watch"></i>{{topics.visit_count}}</span>
                    <span><i class="icon-msg"></i>{{topics.reply_count}}</span>
                </div>
                <div v-html="topics.content"></div>
            </div>

            <div class="comment">
                <p>共（<span>{{topics.reply_count}}</span>）条评论</p>
                <ul>
                    <li v-for="(replie,index) in topics.replies">
                        <div class="author clear">
                            <div class="img left">
                                <img :src="replie.author.avatar_url" alt="">
                            </div>
                            <div class="left">
                                <span class="name">{{replie.author.loginname}}</span>
                                <span class="time">{{replie.create_at | date}}</span>
                            </div>
                            <div class="right">
                                <span>#{{index+1}}</span>
                            </div>
                        </div>
                        <div class="content con" v-html="replie.content"></div>
                        <div class="bottom">
                            <i class="icon-like" @click="like"></i><span>{{replie.ups.length}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <loading class="loading" :show="show"></loading>
        <login :show="login"></login>
    </div>
</template>

<script>
    import loading from '@/components/loading'
    import login from '@/components/isLogin'
    import vHead from '@/components/header2'

    export default {
        data() {
            return {
                topics: [],
                show: true,
                type: '',
                txt: '',
                headerShow: true
            }
        },
        computed:{
            login(){
                if(this.$store.state.accesstoken){
                    return false;
                }else{
                    return true;
                }
            }
        },
        components: {
            loading,
            login,
            vHead,
        },
        mounted() {
            const that = this;
            that.getData();
        },
        methods: {
            getData() {
                let url = '/api/v1/topic/' + this.$route.params.id;
                this.show = true;
                this.axios.get(url)
                    .then(res => {
                        this.topics = res.data.data;
                        this.show = false;
                    })
            },
            back() {
                this.$router.go(-1)
            },
            like(){
               // console.log(this.$refs.like)
                this.type='error';
                this.txt = 'error'
            }
        }
    }
</script>

<style lang="less" scoped>

    .topics {
        min-height: 100vh;
        background-color: #fff;
        .topics_top {
            position: fixed;
            top: 0;
            width: 100%;
            height: 50px;
            line-height: 50px;
            background-color: #fff;
            border-bottom: 1px solid #e5e5e5;
            h3 {
                width: 100vw;
                text-align: center;
                font-size: 16px;
                color: #000;
                font-weight: 600;
            }
            span {
                position: absolute;
                top: 0;
                left: 11px;
                height: 50px;
                line-height: 50px;
                font-size: 26px;
            }
        }
        .main {
            margin-top: 50px;
            .author {
                padding: 8px 0 8px 15px;
                border-bottom: 1px solid #e5e5e5;
                .img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    border: 1px solid #e5e5e5;
                    overflow: hidden;
                    margin-right: 10px;
                    img {
                        width: 100%;
                    }
                }
                .left {
                    font-size: 14px;
                    color: #333;
                    span:nth-child(1) {
                        color: #1fa420;
                        margin-right: 10px;
                    }
                }
                .right {
                    font-size: 14px;
                    color: #000;
                    padding-right: 15px;
                }
            }
            .content {
                padding: 0 2.5%;
                h2 {
                    font-size: 18px;
                    text-align: center;
                    line-height: 24px;
                    font-weight: 600;
                    margin-top: 12px;
                }
                div:nth-of-type(1) {
                    margin-top: 5px;
                    border-bottom: 1px solid #e5e5e5;
                    padding-bottom: 10px;
                    span {
                        text-align: center;
                        margin: 0 5px;
                        font-size: 13px;
                        color: #333;
                    }
                }
                div:nth-of-type(2) {
                    text-align: left;
                    padding: 8px 0 20px;
                }
                img {
                    width: 100%;
                }
            }
            .comment {
                & > p {
                    text-align: left;
                    line-height: 36px;
                    font-size: 14px;
                    color: #000;
                    padding-left: 10px;
                    border-top: 1px solid #e5e5e5;
                    border-bottom: 1px solid #e5e5e5;
                    border-left: 5px solid #1fa420;
                    span {
                        color: #1fa420;
                    }
                }
                .author {
                    border-bottom: 0;
                }
                li {
                    border-bottom: 1px solid #e5e5e5;
                    .author {
                        padding: 8px 0 0 15px;
                    }
                    .content {
                        padding: 0 35px;
                        text-align: left;
                        font-size: 18px;
                        line-height: 36px;
                        word-wrap: break-word;
                    }
                    .bottom {
                        text-align: right;
                        padding: 0 45px 20px 0;
                    }
                }
            }
        }
    }
</style>
