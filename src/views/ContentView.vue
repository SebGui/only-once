<template>
    <section>
        <TopNav />

        <router-view class="router-view"/>
    </section>
</template>

<script setup lang="ts">
    import TopNav from '@/components/TopNav.vue';
</script>

<style scoped>
    section {
        width: 100%;
    }
    .router-view {
        /*height: 100vh;*/
        overflow-y: auto;
        max-height: calc(100vh - var(--topnav-height));
        overflow-x: hidden;
    }
</style>