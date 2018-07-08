<template>
    <div class="wrap">
        <div class="model">
            <div class="title">{{title}}</div>
            <div class="content">{{content}}</div>
            <div class="btn">
                <div class="cancel" @click="cancelHandle">{{cancel}}</div>
                <div class="confirm" @click="confirmHandle">{{confirm}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title:{
                type: String,
                default: '提示'
            },
            content:{
                type: String,
                require: true
            },
            cancel: {
                type: String,
                default: '取消',
            },
            confirm: {
                type: String,
                default: '确定'
            }
        },
        methods:{
            cancelHandle(){
                this.$emit('cancel')
            },
            confirmHandle(){
                this.$emit('confirm')
            }
        }
    }
</script>

<style scoped>
    .wrap{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.3);
        z-index: 9999;
    }
    .model{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 70%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }

    .title{
        text-align: left;
        font-size: 16px;
        color: #000;
        line-height: 36px;
        padding: 10px 10px 0;
        border-bottom: 1px solid #ccc;
    }

    .content{
        padding: 20px 10px;
        font-size: 16px;
        color: #333;
        line-height: 37px;
    }

    .btn{
        display: flex;
        flex-direction: row;
        justify-items: flex-start;
        align-items: center;
        border-top: 1px solid #ccc;
    }
    .btn div{
        flex: 1;
        line-height: 40px;
    }
    .btn div:first-child{
        border-right: 1px solid #ccc;
    }

</style>