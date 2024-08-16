<template>
    <div>
        <ul>
            <li v-for="item in options" :key="item.id"><!-- Will be router links-->
                <i class="material-icons">{{ item.icon }}</i>
                <span>{{ item.name }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue';

    defineProps({
        options: {
            required: true
        }
    })
</script>

<style scoped>

</style>