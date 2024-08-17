<template>
    <div>
        <SingleStat amount="26" icon="monitoring" sentence="How often you account has been viewed" />
        <SingleStat amount="12" icon="trending_up" sentence="How often your profile is downloaded" />
    </div>
</template>

<script setup lang="ts">
  import SingleStat from '@/components/SingleStat.vue';

  // get stats then v-for on single stats
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: stretch;
        justify-content: space-evenly;
    }
</style>