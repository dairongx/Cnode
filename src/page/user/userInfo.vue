<template>
    <div class="userInfo">
        <v-head txt="用户信息" :show="headerShow"></v-head>
        <div>
            <div class="info"><img src="" alt=""></div>
            <div class="info">loginName:{{}}</div>
            <div class="info"></div>
            <div class="info"></div>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/header2'
    export default {
        data(){
            return {
                headerShow: true,
                userInfo: null
            }
        },
        components:{
            vHead
        },
        methods:{
            getInfo(){
                let url = '/api/v1/user/'+this.loginName;
                this.axios.get(url)
                    .then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                })
            }
        }
    }
</script>

<style>

</style>