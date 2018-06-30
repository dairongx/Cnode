<template>
    <div class="app" ref="app" id="scroll">
        <div class="index">
            <ul v-if="list">
                <li v-for="r in list">
                    <div class="title clear">
                        <div class="left img" @click="userInfo(r.author.loginname)">
                            <img :src="r.author.avatar_url" alt="">
                        </div>
                        <div class="left">
                            <p @click="userInfo(r.author.loginname)">{{r.author.loginname}}</p>
                            <p>{{r.create_at | date}}</p>
                        </div>
                        <div class="right">
                            <div v-if="r.top">置顶</div>
                        </div>
                    </div>
                    <h2 @click="go(r.id)">{{r.title}}</h2>
                    <div class="bottom">
                        <span><i class="icon-watch"></i>{{r.visit_count}}</span>
                        <span><i class="icon-msg"></i>{{r.reply_count}}</span>
                        <span>{{r.last_reply_at | date }}</span>
                    </div>
                </li>
            </ul>
            <loading class="loading" :show="show"></loading>
        </div>
    </div>
</template>

<script>
    import loading from '@/components/loading'

    export default {
        data() {
            return {
                list: [],
                show: false,
                page: 1,
                limit: 20,
                more: true
            }
        },
        components: {
            loading,
        },
        mounted() {
            let that = this;
            // console.log(this.$router)
            that.getData(that.$route.params[0]);
            that.$nextTick(that.$refs.app.addEventListener('scroll', that.scroll))
        },
        methods: {
            getData(data) {   /* 加载数据 */
                let that = this;
                let url = '/api/v1/topics',
                    tab = data,
                    page = this.page,
                    limit = this.limit;
                if (tab === 'all') {
                    tab = '';
                }
                that.show = true;
                that.axios.get(url, {params: {page: page, tab: tab, limit: limit}})
                    .then(res => {
                        that.list = that.list.concat(res.data.data);
                        that.show = false;
                        that.more = true;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            go(id) {    /* 跳转详情页 */
                this.$router.push('/topic/' + id)
            },
            scroll() {   /* 下拉加载更多 */
                let $scrollTop = this.$refs.app.scrollTop,
                    $clientHeight = this.$refs.app.clientHeight,
                    $scrollHeight = this.$refs.app.scrollHeight;
                if ($scrollHeight - ($scrollTop + $clientHeight) < 50) {
                    if (this.more) {
                        this.more = false;
                        this.page += 1;
                        this.getData(this.$route.params[0])
                    }
                }

            },
            userInfo(name) {
                this.$router.push('/user/userInfo/' + name)
            }
        }
    }
</script>

<style lang="less" scoped>
    .app {
        position: fixed;
        top: 50px;
        bottom: 45px;
        left: 0;
        width: 100%;
        height: calc(100vh - 95px);
        overflow-y: auto;
        .index {
            ul {
                li {
                    padding: 12px 2.5% 0;
                    background-color: #fff;
                    margin-bottom: 8px;
                    .title {
                        .img {
                            width: 45px;
                            height: 45px;
                            border-radius: 50%;
                            overflow: hidden;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        p {
                            text-align: left;
                            padding-left: 10px;
                            line-height: 25px;
                            &:nth-child(1) {
                                font-size: 14px;
                                color: #000;
                            }
                            &:nth-child(2) {
                                font-size: 13px;
                                color: #333;
                            }
                        }
                        .right {
                            div {
                                padding: 0 10px;
                                font-size: 13px;
                                line-height: 26px;
                                color: #fff;
                                border-radius: 5px;
                                text-align: center;
                                margin: 5px 30px 0 0;
                                background-color: #80bd01;
                            }
                        }
                    }
                }
            }
            h2 {
                padding: 5px 10px;
                line-height: 26px;
                font-size: 16px;
                color: #000;
                text-align: left;
                border-bottom: 1px solid #e5e5e5;
            }
            .bottom {
                width: 100%;
                height: 20px;
                padding: 8px 0;
                span {
                    display: inline-block;
                    width: 32%;
                    font-size: 13px;
                    line-height: 20px;
                    text-align: center;
                    border-right: 1px solid #e5e5e5;
                    &:nth-child(3) {
                        border-right: 0;
                    }
                }
            }
        }

    }
</style>
