<template>
    <div>
        <v-header></v-header>

        <keep-alive>
            <router-view class="child" :key="$route.fullPath"/>
        </keep-alive>

        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from '@/components/header'
    import vFooter from '@/components/footer'

    export default {
        /*computed: {
            animateType: function () {
                console.log(this.$store.state.animateType);
                return this.$store.state.animateType;
            }
        },*/
        components: {
            vHeader,
            vFooter
        }
    }

</script>

<style lang="less" scoped>
    /*.child {
        position: absolute;
        width: 100%;
        transition: all .8s cubic-bezier(.55, 0, .1, 1);
    }

    .right-enter, .left-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
    }

    .right-leave-active, .left-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
    }*/
</style>