<template>
    <div>
        <button class="cancelButton" @click="handleCancel">{{ texts.cancel }}</button>
        <button class="confirmButton" @click="handleValid">{{ texts.confirm }}</button>
    </div>
</template>

<script setup lang="ts">
    import {defineProps, defineEmits} from 'vue'

    defineProps({
        texts: {
            required: true,
            type: Object
        }
    })
    const emit = defineEmits(['confirmClicked', 'cancelClicked'])

    const handleValid = (): void => {
        emit('confirmClicked')
    }   
    const handleCancel = (): void => {
        emit('cancelClicked')
    }
</script>

<style scoped>
    div {
        display: flex;
        justify-content: flex-end;
    }
    div button{
        margin-left:5px;
        font-weight: bold;
    }
    .confirmButton, .confirmButton:active, .confirmButton:focus {
        border: 1px solid var(--main-validate-color);
        color: var(--main-text-color-white);
        background-color: var(--main-validate-color);
        transition: 200ms;
    }
    .confirmButton:hover {
        border:1px solid var(--main-validate-color);
        color: var(--main-validate-color);
        background-color: var(--main-text-color-white);
    }
    .cancelButton {
        border:none;
        color: var(--main-text-color-gray);
        transition: 200ms;
    }
    .cancelButton:hover {
        background-color: var(--main-bg-color-white);
        color: var(--main-cancel-color)
    }
</style>