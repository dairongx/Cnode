<template>
    <div class="login">
        <v-head txt="登录" :show="headerShow"></v-head>
        <div>
            <form>
                <input type="text" placeholder="accesstoken" v-model.trim="accesstoken">
                <button @click.prevent="login">登录</button>
            </form>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/header2'

    export default {
        data() {
            return {
                accesstoken: '',
                headerShow: true
            }
        },
        components: {
            vHead
        },
        methods: {
            go() {
                this.$router.go(-1)
            },
            login() {
                const user = this.accesstoken;
                if (user !== '') {
                    let url = '/api/v1/accesstoken';
                    this.axios.post(url, {
                        accesstoken: user
                    }).then(res => {
                        if (res.status === 200) {
                            let name = res.data.loginname;
                            let avatar_url = res.data.avatar_url;
                            let user_id = res.data.id;
                            window.sessionStorage.setItem('accesstoken', user);
                            window.sessionStorage.setItem('loginname', name);
                            window.sessionStorage.setItem('avatar_url', avatar_url);
                            window.sessionStorage.setItem('user_id', user_id);
                            this.$router.go(-1);
                        }
                        else {
                            console.log(res)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .login {
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        form {
            padding-top: 80px;
            input {
                width: 80%;
                height: 40px;
                line-height: 40px;
                padding-left: 15px;
                border: 1px solid #ccc;
                border-radius: 20px;
                margin: 10px 0 20px;
                outline: none;
            }
            button {
                width: calc(80% + 17px);
                height: 40px;
                text-align: center;
                font-size: 16px;
                letter-spacing: 20px;
                color: #fff;
                border: 0;
                border-radius: 20px;
                background-color: #000;
                outline: none;
            }
        }
    }
</style>