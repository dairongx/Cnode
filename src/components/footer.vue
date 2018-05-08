/* Created by drx on 2018/3/29 */

<template>
    <div class="footer">
        <ul class="clear">
            <li :class="[this.$route.path.split('/')[1]==='index' ? 'active':'']" @click="go('/index')">
                <i class="icon-index"></i>首页
            </li>
            <li :class="[this.$route.path==='/send' ? 'active':'']" @click="go('/send')">
                <i class="icon-send"></i>发表
            </li>
            <li :class="[this.$route.path==='/msg' ? 'active':'']" @click="go('/msg')">
                <i class="icon-msg"></i>消息
            </li>
            <li :class="[this.$route.path==='/user' ? 'active':'']" @click="go('/user')">
                <i class="icon-self"></i>我的
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods: {
            go(path) {
                this.$router.push(path);
                console.log(this.$route)
            }
        }
    }

</script>

<style scoped>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 45px;
        border-top: 1px solid #e5e5e5;
        z-index: 2;
    }

    .footer ul li {
        float: left;
        width: 25vw;
        line-height: 45px;
        font-size: 14px;
        background: #fff;
    }

    .footer ul li a {
        color: #333;
    }
    .active{
        color: #80bd01;
    }
</style>
