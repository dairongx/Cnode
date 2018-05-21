<template>
    <div class="loading" v-if="show">
        <div class="box"></div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                require: true
            }
        }
    }
</script>

<style scoped>
    .loading {
        padding-top: 81px;
    }

    .box {
        width: 40px;
        height: 40px;
        margin: 0 auto;
        border-width: 3px;
        border-style: solid;
        border-color: #1fa420 transparent #1fa420 #1fa420;
        border-radius: 50%;
        animation: change 1s linear infinite;
    }

    @keyframes change {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
