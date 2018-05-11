<template>
    <div :class="['message_'+type,'msg']" v-if="show">
        <div><i class="left"></i><span class="left">{{txt}}</span></div>
    </div>
</template>

<script>
    export default {
        props: {
            txt: {
                type: String,
                default: 'info'
            },
            type: {
                type: String,
                default: 'info'
            },
            show: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {}
        },
        mounted() {
            const that = this;
            setTimeout(function () {
                that.show = false;
            }, 5000)
        }
        /*watch: {
            'show':function(val) {
                if (val) {
                    const that = this;
                    console.log(val)
                    window.setTimeout(function () {
                        that.show = false;
                    }, 3000)
                }
            }
        }*/
    }
</script>

<style lang="less" scoped>
    .msg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        div {
            position: absolute;
            top: 35%;
            left: 50%;
            width: 60%;
            height: 30px;
            text-align: center;
            padding: 6px 0;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            border-radius: 5px;
            z-index: 99999;
            i {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin-left: 20px;
                overflow: hidden;
            }
            span {
                height: 30px;
                line-height: 30px;
                margin-left: 10px;
            }
        }
    }

    .message_warning {
        div {
            border: 2px solid #f39b12;
            background-color: #fff6ce;
            i {
                background: url(../assets/icon.png) no-repeat 0 0;
            }
        }
    }

    .message_success {
        div {
            border: 2px solid #3eccb4;
            background-color: #f0f9eb;
            i {
                background: url(../assets/icon.png) no-repeat -30px 0;
            }
        }
    }

    .message_error {
        div {
            border: 2px solid #e85445;
            background-color: #fef0f0;
            i {
                background: url(../assets/icon.png) no-repeat -60px 0;
            }
        }
    }

    .message_info {
        div {
            border: 2px solid #11cd6d;
            background-color: #edf2fc;
            i {
                background: url(../assets/icon.png) no-repeat -180px 0;
            }
        }
    }
</style>