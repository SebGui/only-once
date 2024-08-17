<template>
    <div class="unselectable">
        <i class="material-icons">{{ icon }}</i>
        <h3>{{ amount }} Views</h3>
        <p>{{ sentence }}</p>
    </div>
</template>

<script setup lang="ts">
    import {defineProps} from 'vue'
    defineProps({
        amount: {required:true},
        icon: {required:true},
        sentence: {required:true}
    })
</script>

<style scoped>
    div {
        max-width: var(--stats-card-width);
        width: var(--stats-card-width);
        background-color: var(--main-bg-white);
        border: 1px solid var(--main-active-color);
        border-radius: 5px;
        margin: 20px auto;
        transition: 100ms;
        overflow: hidden;
        cursor:default;
        padding: 5px;
    }
    div:hover {
        position:relative;
        top:2px;
        left:2px;
        box-shadow: 5px 5px 5px lightblue;
    }
    i {
        font-size: 100px;
        width: 100px;
        /*margin-left: 33%;*/
    }
    h3 {
        margin: 40px 19px 0px 19px;
        color: var(--main-bg-color-darken);
    }
    p {
        margin-top: 0px;
    }
</style>