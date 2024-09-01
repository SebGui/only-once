<template>
      <!-- Label -->
      <div @click="toggleDropdown">
        <i class="material-icons" :class="options[currentValueRef-1].class" style="font-size:15px;">{{ options[currentValueRef-1].icon }}</i>
        <span class="labelText">{{ options[currentValueRef-1].text }}</span>
      </div>

      <!-- Dropdown -->
      <div v-if="dropdownShown === true" class="dropdownContainer">
       <template v-for="item in options" :key="item.id">
         <div @click="handleSelect(item.id)">
           <i class="material-icons" :class="item.class" style="font-size:15px;">{{ item.icon }}</i>
           <span class="labelText">{{ item.text }}</span>
         </div>
       </template>
      </div>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore';
  import SelectItem from '@/types/SelectItem';
  import Status from '@/types/Status';
  import { defineProps, PropType, ref } from 'vue';

  // Store init
  const authStore = useAuthStore();

  // Props init & definition
  const props = defineProps({
    options : {
        required:true,
        type: Array as PropType<SelectItem[]>
    },
    currentValue : {
        required:true,
        type: Number
    }
  })

  // Current value reference
  const currentValueRef = ref<number>(props.currentValue)

  // Show hide management
  let dropdownShown = ref<boolean>(false)
  const toggleDropdown = ():void => {
    dropdownShown.value = !dropdownShown.value
  }

  // Select flow
  const handleSelect = (theOption: Status): void => {
    currentValueRef.value = theOption
    if (authStore !== null && authStore.user !== null) {
      authStore.user.Status = theOption
      authStore.updateUser()
    }
    toggleDropdown()
  }
</script>

<style scoped>
  div {
    display:flex;
    margin-right:5px;
    margin-left:5px;
    cursor:pointer;
  }
  .labelText {
    margin-left:5px;
  }
  .labelText:hover {
    color: var(--main-bg-color-darken);
  }
  .dropdownContainer {
    flex-direction: column;
    position:absolute;
    top:calc(var(--topnav-height) - 30px);
    border-radius: 5px;
    border: 1px solid var(--main-bg-color-darken);
    background-color: var(--main-bg-white);
    color: var(--main-text-color);
    font-weight:300;
    min-width: var(--select-opt-width);
  }
  .dropdownContainer div {
    padding:10px;
    margin:0;
  }
  .dropdownContainer div:hover {
    background-color: var(--main-bg-color);
    color: var(--main-text-color-white);
    font-weight:bold;
  }
</style>