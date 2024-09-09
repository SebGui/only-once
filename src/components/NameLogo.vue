<template>
    <section class="unselectable">
        <i class="material-icons">swipe_right</i>
        <span>{{ name }}</span>
    </section>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    
    defineProps({
        name: {
            required:true
        }
    })
</script>

<style scoped>
    section {
        color:white;
        font-weight: bold;
    }
    i {
        margin-right:10px;
    }

</style>