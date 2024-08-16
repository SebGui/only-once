<template>
    <section>
        <TopNav />
        <!-- Make nav component-->

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
        height: 100vh;
        overflow-y: scroll;
        max-height: calc(100vh - var(--topnav-height));
    }
</style>