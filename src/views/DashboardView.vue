<template>
    <div>
        <h2>Dashboard</h2>
        <!-- Make Single stat component : 1 number, 1 img/graph, 1 text
              Make a stat type with store -->
        <StatsList />
    </div>
</template>

<script setup lang="ts">
  import StatsList from '@/components/dashboard/StatsList.vue';
</script>

<style scoped>

</style>