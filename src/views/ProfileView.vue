<template>
    <div>
        <h2>Profile</h2>
        <section class="profileContent">
            <!-- Summary block component -->
            <SummaryComp @showAddSummary="showAddSummary"/>

            <!-- Experiences block component -->
            <!-- Language block component -->
            <!-- Skills block component -->
            <!-- Education block component -->


            
            
            <div v-if="showModal === true" class="modal" @click.self="closeModal">
                <!-- Show forms in here ? -->
                <SummaryForm v-if="showSummary === true" @closeModal="closeModal"/>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
  import SummaryComp from '@/components/profile/SummaryComp.vue';
  import SummaryForm from '@/components/profile/SummaryForm.vue';
  import { ref } from 'vue'

  // Modal logic
  const showModal = ref<boolean>(false)
  const toggleModal = () => {
    showModal.value = !showModal.value
  }
  const closeModal = (): void => {
    showModal.value = false
    resetFormVisibility()
  }

  // Summary Logic
  const showSummary = ref<boolean>(false)
  const showAddSummary = (): void => {
    showSummary.value = true
    toggleModal()
  }

  // Global reseter
  const resetFormVisibility = () => {
    showSummary.value = false
  }

</script>

<style scoped>
    .profileContent{
        padding:10px;
        display:flex;
    }
    .toto {
        width:10px;
    }
</style>