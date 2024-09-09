<template>
    <section>
        <ul class="sideNav">
            <li v-for="item in options" :key="item.id"><!-- Will be router links-->
                <i class="material-icons">{{ item.icon }}</i>
                <span>{{ item.name }}</span>
            </li>
        </ul>
    </section>
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
    .sideNav {
        height: calc(100vh - var(--topnav-height) - 10px);
        border-right: 1px solid lightgray;
        margin-top: 0;
        list-style-type: none;
        text-align: left;
        padding-left: 20px;
        padding-top: 10px;
    }
    .sideNav i {
        margin-right:10px;
        position: relative;
        top: 5px;
    }
    ul {
        display: flex;
        flex-direction: column;
        align-items: baseline;
    }
    ul li {
        height:40px;
        width: 100%;
        cursor: pointer;
        transition: 100ms;
    }
    ul li:hover {
        color: var(--main-text-color-hover)
    }
</style>