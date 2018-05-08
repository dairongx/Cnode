<template>
    <div class="app">
        <div class="index">
            <ul>
                <li v-for="r in res" @click="go(r.id)">
                    <div class="title clear">
                        <div class="left img">
                            <img :src="r.author.avatar_url" alt="">
                        </div>
                        <div class="left">
                            <p>{{r.author.loginname}}</p>
                            <p>{{r.create_at | date}}</p>
                        </div>
                    </div>
                    <h2>{{r.title}}</h2>
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
                res: [],
                show: false,
                limit: 20,
                more: true
            }
        },
        components: {
            loading,
        },
        mounted() {
            let that = this;
            that.getData(that.$route.params[0]);
            window.addEventListener('scroll', that.scroll)
        },
        methods: {
            getData(data) {   /* 加载数据 */
                let url = '/api/v1/topics',
                    tab = data,
                    limit = this.limit;
                if (tab === 'all') {
                    tab = '';
                }
                this.show = true;
                this.axios.get(url, {params: {tab: tab, limit: limit}})
                    .then(res => {
                        this.res = res.data.data;
                        this.show = false;
                        this.more = true;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            go(id) {    /* 跳转详情页 */
                this.$router.push('/topic/' + id)
            },
            scroll() {   /* 下拉加载更多 */
                let $scrollTop = window.pageYOffset,
                    $clientHeight = document.body.clientHeight,
                    $scrollHeight = document.documentElement.scrollHeight;
                if ($scrollHeight - ($scrollTop + $clientHeight) < 50) {
                    if (this.more) {
                        this.more = false;
                        this.limit += 10;
                        this.getData(this.$route.params[0])
                    }
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .app {
        width: 100%;
        margin: 50px 0 45px;
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
                    }
                }
            }
            h2 {
                padding: 5px 10px;
                line-height: 26px;
                font-size: 18px;
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
