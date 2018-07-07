<template>
    <div class="message">
        <v-head txt="消息" :show="headerShow"></v-head>
        <div class="msg">
            <no-login :show="!isLogin"></no-login>
            <div v-if="isLogin">
                <div class="noMsg" v-if="noReadMsg.length==0 && ReadMsg.length==0">
                    暂无消息
                </div>
                <div v-if="noReadMsg.length>0" class="unread">
                    <ul>
                        <li v-for="item in noReadMsg" v-html="item">

                        </li>
                    </ul>
                </div>
                <div v-if="ReadMsg.length>0" class="all">
                    <ul>
                        <li v-for="item in ReadMsg" v-html="item">

                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHead from '@/components/title'
    import vFooter from '@/components/footer'
    import noLogin from '@/components/isLogin'

    export default {
        data() {
            return {
                headerShow: false,
                noReadMsg: '',
                ReadMsg: ''
            }
        },
        computed: {
            isLogin() {
                if (this.$store.state.accesstoken) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        components: {
            vHead,
            vFooter,
            noLogin
        },
        mounted(){
            this.getMessage()
        },
        methods:{
            getMessage(){
                let accesstoken = this.$store.state.accesstoken;
                this.axios.get('/api/v1/messages',{
                    params:{
                        accesstoken: accesstoken
                    }
                }).then(res=>{
                    console.log(res)
                    this.noReadMsg = res.data.data.hasnot_read_messages;
                    this.ReadMsg = res.data.data.has_read_messages;
                })
            }
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
        min-height: 100%;
        padding: 0 2.7%;
        background-color: #fff;
    }
    .noMsg{
        padding: 50px 0 0;
        color: #f00;
    }

</style>