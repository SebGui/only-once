<template>
    <div>
        <i class="material-icons">swipe_right</i>
        <span>{{ name }}</span>
    </div>
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
    div {
        color:white;
        font-weight: bold;
    }
    i {
        margin-right:10px;
    }

</style>