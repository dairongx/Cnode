<template>
    <div class="topics">
        <v-head txt="主题" :show="headerShow"></v-head>
        <div class="main" v-if="topics">
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
                    <span :class="['collect',topics.is_collect?'on':'']"
                          @click="collect(topics.id,topics.is_collect)"><i class="icon-collect"></i></span>
                </div>
                <div v-html="topics.content"></div>
            </div>

            <div class="comment">
                <div v-if="topics.reply_count===0"><p>暂无评论</p></div>
                <div v-if="topics.reply_count!==0">
                    <p>共（<span>{{topics.reply_count}}</span>）条评论</p>
                    <ul>
                        <li v-for="(replie,index) in replies">
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
                            <div class="bottom" v-if="!replie.is_uped">
                                <i class="icon-like" @click.stop="like(replie.id)"></i>
                                <span @click.stop="like(replie.id)">{{replie.ups.length}}</span>
                                <span class="add_replies" @click="add_replie(replie.id,replie.author.loginname)">回复</span>
                            </div>
                            <div class="bottom" v-else>
                                <i class="icon-like is_uped" @click.stop="like(replie.id)"></i>
                                <span @click.stop="like(replie.id)">{{replie.ups.length+1}}</span>
                                <span class="add_replies" @click="add_replie(replie.id,replie.author.loginname)">回复</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <login :show="!login"></login>
        </div>
        <loading class="loading" :show="show"></loading>
        <model v-if="showModel" content="你还未登录，请登录" @cancel="cancel" @confirm="confirm"></model>
        <div class="reply" v-if="login">
            <input ref="input" type="text" placeholder="请输入评论" v-model="reply_text">
            <div @click="reply(topics.id)">回复</div>
        </div>
    </div>
</template>

<script>
    import loading from '@/components/loading'
    import login from '@/components/isLogin'
    import vHead from '@/components/title'
    import model from '@/components/model'

    export default {
        data() {
            return {
                topics: null,
                replies: null,
                show: true,
                type: '',
                txt: '',
                headerShow: true,
                showModel: false,
                is_reply: false,
                reply_text: '',
                reply_id: null
            }
        },
        computed: {
            login() {
                if (this.$store.state.accesstoken) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        components: {
            loading,
            login,
            vHead,
            model
        },
        mounted() {
            const that = this;
            that.getData();
        },
        methods: {
            getData() {
                let accesstoken = this.$store.state.accesstoken;
                let url = '/api/v1/topic/' + this.$route.params.id;
                this.show = true;
                this.axios.get(url, {
                    params: {
                        accesstoken: accesstoken
                    }
                })
                    .then(res => {
                        this.topics = res.data.data;
                        this.replies = res.data.data.replies;
                        this.show = false;
                    })
            },
            back() {
                this.$router.go(-1)
            },
            cancel() {
                this.showModel = false;
            },
            confirm() {
                this.showModel = false;
                this.$router.push('/login')
            },
            // 点赞
            like(id) {
                let accesstoken = this.$store.state.accesstoken;
                if (!this.login) {
                    this.showModel = true;
                } else {
                    this.axios.post(`/api/v1/reply/${id}/ups`, {
                        accesstoken: accesstoken
                    }).then(res => {
                        if (res.data.success) {
                            this.replies.forEach((item) => {
                                if (item.id == id) {
                                    item.is_uped = (res.data.action == 'up') ? true : false;
                                }
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            //收藏
            collect(id, is_collect) {
                let url = is_collect ? `/api/v1/topic_collect/de_collect` : `/api/v1/topic_collect/collect`;
                let accesstoken = this.$store.state.accesstoken;
                this.axios.post(url, {
                    accesstoken: accesstoken,
                    topic_id: id
                }).then(res => {
                    if (res.data.success) {
                        let obj = {
                            is_collect: !is_collect
                        };
                        this.topics = Object.assign(this.topics, obj)
                    }
                })
            },
            // 评论
            add_replie(id,name) {
                if (this.login) {
                    this.reply_id = id;
                    this.reply_text = `@${name}:`;
                    this.$refs.input.focus();
                } else {
                    this.showModel = true;
                }
            },
            reply(topic_id) {
                if (this.reply_text.trim().length > 0) {
                    let url =`api/v1/topic/${topic_id}/replies `;
                    let accesstoken = this.$store.state.accesstoken;
                    this.axios.post(url,{
                        accesstoken: accesstoken,
                        content: this.reply_text,
                        reply_id: this.reply_id
                    }).then(res=>{
                        if(res.data.success){
                            this.getData()
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .topics {
        height: 100vh;
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
            position: absolute;
            top: 51px;
            bottom: 51px;
            width: 100%;
            overflow-y: auto;
            background-color: #fff;
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
                    position: relative;
                    margin-top: 5px;
                    border-bottom: 1px solid #e5e5e5;
                    padding-bottom: 10px;
                    span {
                        text-align: center;
                        margin: 0 5px;
                        font-size: 13px;
                        color: #333;
                    }
                    .collect {
                        position: absolute;
                        right: 15px;
                        top: -10px;
                        font-size: 24px;
                        color: #333;
                    }
                    .collect.on {
                        color: #f00;
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
                div {
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
                            .is_uped {
                                color: #f00;
                            }
                            .add_replies {
                                padding-left: 20px;
                                color: #4a79cf;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
    }

    .reply {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: #fff;
        text-align: left;
        border-top: 1px solid #e2e2e2;
        z-index: 99;
        input {
            width: 70%;
            line-height: 45px;
            font-size: 14px;
            color: #333;
            border: 0;
            padding-left: 20px;
            outline: none;
        }
        div {
            display: inline-block;
            width: 20%;
            line-height: 50px;
            text-align: center;
        }
    }
</style>
