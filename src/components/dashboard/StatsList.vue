<template>
    <div>
        <template v-for="item in config.Stats" :key="item.id">
            <SingleStat :stat="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
  import SingleStat from '@/components/dashboard/SingleStat.vue';
  import config from '@/../onceConfig';

  // [Later] : Build actual stats from backend with ascociated Pinia Store
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