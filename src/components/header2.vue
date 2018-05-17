<template>
    <div>
        <span>{{txt}}</span>
        <i class="icon-back" @click="go" v-if="show"></i>
    </div>
</template>

<script>
    export default {
        name: 'header',
        props: {
            txt:{
                type: String,
                default: 'text'
            },
            show:{
                type: Boolean
            }
        },
        methods:{
            go(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
    div {
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #000;
        font-size: 18px;
        text-align: center;
        background-color: #fff;
        border: 1px solid #e5e5e5;
        z-index: 99;
        i {
            position: absolute;
            top: 0;
            left: 20px;
            width: 30px;
            height: 50px;
            font-size: 18px;
            line-height: 50px;
        }
    }
</style>