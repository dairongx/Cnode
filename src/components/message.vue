<template>
    <div class="tips" v-if="show">
        <div><i :style="types[type]"></i><span>{{txt}}</span></div>
    </div>
</template>

<script>
    export default {
        props: ['txt', 'type'],
        data() {
            return {
                icon: '../assets/icon.png',
                types: {
                    warning: {'background': `url(${this.icon}) no-repeat 0 0`},
                    success: {'background': `url(${this.icon}) no-repeat -30px 0`},
                    error: {'background': `url(${this.icon}) no-repeat -60px 0`},
                    info: {'background': `url(${this.icon}) no-repeat -90px 0`}
                },
                show: false
            }
        },
        watch: {
            txt: function (val) {
                if (val) {
                    const that = this;
                    that.show = true;
                    window.setTimeout(function () {
                        that.show = false;
                    }, 3000)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .tips {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        div {
            position: absolute;
            top: 50%;
            left: 50%;
            text-align: center;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            i {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
            }
            span {
                height: 30px;
                line-height: 30px;
            }
        }
    }
</style>