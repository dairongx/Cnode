<template>
    <div class="index">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>

</script>

<style scoped>
    div.index {
        width: 100%;
        height: 100%;
    }
</style>