<template>
    <div class="collect">
        <v-head txt="我的收藏" :show="show"></v-head>
        <div class="collect_list recent_info" v-if="collect">
            <ul class="recent_replies_list" v-if="collect.length!==0">
                <li v-for="item in collect" class="clear" @click="$router.push('/topic/'+item.id)">
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
</template>

<script>
    import vHead from '@/components/title'

    export default {
        data(){
            return {
                show: true,
                collect: null
            }
        },
        computed:{
            loginName(){
                return this.$store.state.loginName;
            }
        },
        components: {
            vHead
        },
        mounted(){
            const that = this;
            that.getCollect();
        },
        methods:{
            getCollect() {
                let url = '/api/v1/topic_collect/' + this.loginName;
                this.axios.get(url)
                    .then(res => {
                        console.log(res)
                        if (res.data.success) {
                            this.collect = res.data.data;
                        }
                    }).catch(err => {
                    console.log(err);
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    .recent_info {
        height: calc(100vh - 56px);
        background-color: #fff;
        padding: 56px 2.7% 0;
        overflow-y: auto;
        li {
            padding: 5px 0;
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
</style>