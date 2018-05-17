<template>
    <div class="pub">
        <v-head txt="发表" :show="headerShow"></v-head>
        <div class="publish">
            <no-login :show="!isLogin"></no-login>
            <div v-if="isLogin">
                <div class="line">
                    选择分类：
                    <select name="" id="" class="select" v-model="tab">
                        <option value="ask">问答</option>
                        <option value="share">分享</option>
                        <option value="job">招聘</option>
                        <option value="dev">测试</option>
                    </select>
                </div>
                <div class="line">
                    <input @keyup="check" v-model="title" :class="[err? 'err':'']" type="text" minlength="10" placeholder="请输入标题,字数在10字以上">
                    <p v-show="err">标题至少10字</p>
                </div>
                <div class="line">
                    <textarea v-model="content" rows="20" placeholder="支持markdown语法"></textarea>
                </div>
                <div class="line">
                    <button @click="newTopics"><i class="icon-send"></i>发表</button>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHead from '@/components/header2'
    import vFooter from '@/components/footer'
    import noLogin from '@/components/isLogin'

    export default {
        data() {
            return {
                headerShow: false,
                tab: 'dev',
                title: '',
                content: '',
                err: false
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.accesstoken;
            }
        },
        components: {
            vHead,
            vFooter,
            noLogin
        },
        methods: {
            newTopics() {
                let tab = this.tab,
                    title = this.title,
                    content = this.content,
                    url = '/api/v1/topics';
                console.log(`tab:${tab}`);
                if (title.length > 10 && content !== '') {
                    this.axios.post(url, {
                        accesstoken: this.isLogin,
                        title: title,
                        tab: 'dev',
                        content: content
                    }).then(res=>{
                        if(res.data.success){
                            alert(1)
                        }
                    })
                }else{
                    alert('请填写完整');
                }
            },
            check(){
                console.log(1)
                console.log(this.title.length)
                if(this.title.length<10){
                    this.err = true
                }else{
                    this.err = false
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .pub {
        position: absolute;
        top: 51px;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .publish {
        min-height: 100%;
        padding: 0 2.7%;
        background-color: #fff;
        .line {
            position: relative;
            width: 100%;
            padding: 10px 0;
            text-align: left;
            select {
                width: 60%;
                height: 35px;
                line-height: 35px;
                border: 1px solid #e2e2e2;
                border-radius: 5px;
                padding-left: 10px;
                font-size: 16px;
            }
            input {
                width: calc(100% - 10px);
                height: 35px;
                line-height: 35px;
                font-size: 16px;
                border: 1px solid #e2e2e2;
                border-radius: 5px;
                padding-left: 10px;
                outline: none;
                &.err{
                    border: 1px solid #ff2525;
                }
            }
            p{
                position: absolute;
                top: 0;
                right: 5px;
                color: #ff2525;
                font-size: 12px;
                line-height: 57px;
            }
            textarea {
                width: calc(100% - 10px);
                padding: 5px;
                font-size: 14px;
                line-height: 18px;
                border: 1px solid #e2e2e2;
                border-radius: 5px;
                outline: none;
                resize: none;
            }
            &:last-child {
                text-align: right;
                button {
                    width: 100%;
                    height: 35px;
                    line-height: 35px;
                    border-radius: 5px;
                    color: #fff;
                    background-color: #ff1953;
                    outline: none;
                    border: 0;
                    letter-spacing: 6px;
                }
            }
        }
    }

</style>