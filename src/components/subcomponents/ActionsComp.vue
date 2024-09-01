<template>
    <div class="unselectable">
        <i class="material-icons deleteIcon" @click="showDelete">delete</i>
        <i class="material-icons editIcon" @click="handleEdit">edit</i>

        <div v-if="showModal === true" class="modal" @click.self="closeModal">
            <div class="popup">
                <h3>Are you sure you want to delete this item?</h3>
                <ValidCancelBtnsComp :texts="{confirm:'Delete', cancel:'Cancel'}" @confirmClicked="handleDelete" @cancelClicked="closeModal" class="btnPopup"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {defineEmits, ref} from 'vue'
    import ValidCancelBtnsComp from '@/components/subcomponents/ValidCancelBtnsComp.vue'

    // Define emits
    const emit = defineEmits(['deleteClicked', 'editClicked'])

    const showModal = ref<boolean>(false)
    const closeModal = ():void => {
        showModal.value = false;
    }
    
    const showDelete = ():void => {
        showModal.value = true
    }
    const handleDelete = ():void => {
        showModal.value = false;
        emit('deleteClicked')
    }
    const handleEdit = ():void => {
        emit('editClicked')
    }
</script>

<style scoped>
    div {
        display: flex;
        justify-content: flex-end;
    }
    .deleteIcon {
        cursor:pointer;
        transition: 200ms;
    }
    .deleteIcon:hover {
        color: var(--main-cancel-color)
    }
    .editIcon {
        cursor:pointer;
        transition: 200ms;
        margin-left:5px;
    }
    .editIcon:hover {
        color: var(--main-bg-color)
    }
    .popup {
        background-color: var(--main-bg-white);
        border: 1px solid var(--main-active-color);
        border-radius: 5px;
        margin: auto auto;
        box-shadow: 5px 5px 5px lightblue;
        height:100px;
        padding: 20px;
        display: block;
    }
    .btnPopup {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        flex-direction: row;
        position: relative;
        top: 10px;
    }
</style>