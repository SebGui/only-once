<template>
    <div>
        <h2>Profile</h2>
        <section class="profileContent">
            <!-- Summary block component -->
            <SummaryComp @addSummary="showSummaryForm" @editSummary="editSummary" @deleteSummary="deleteSummary"/>

            <!-- Experiences block component -->
            <ExperienceComp @addExperience="showExperienceForm" @editExperience="editExperience" @deleteExperience="deleteExperience"/>


            <!-- Language block component -->
            <!-- Skills block component -->
            <!-- Education block component -->

            <div v-if="showModal === true" class="modal" @click.self="closeModal">
                <!-- Show forms in here ? -->
                <SummaryForm v-if="showSummary === true" :isEdit="isEdit" @closeModal="closeModal"/>
                <ExperienceForm v-if="showExperience === true" :isEdit="isEdit" :expID="expIdToEdit" @closeModal="closeModal"/>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
  import SummaryComp from '@/components/profile/SummaryComp.vue';
  import SummaryForm from '@/components/profile/SummaryForm.vue';
  import ExperienceComp from '@/components/profile/ExperienceComp.vue';
  import ExperienceForm from '@/components/profile/ExperienceForm.vue';
  import useProfileStore from '@/stores/profileStore';
  import { ref } from 'vue'

  const profileStore = useProfileStore()

  // Modal logic
  const isEdit = ref<boolean>(false) // Control edit mode
  const expIdToEdit = ref<string>(''); // Bears the concerned element id

  const showModal = ref<boolean>(false)
  const toggleModal = () => {
    showModal.value = !showModal.value // Reveals the modal vie
  }
  const closeModal = (): void => {
    showModal.value = false;
    resetFormVisibility() // Hide all forms
    isEdit.value = false // Set edit to false
  }

  // Summary Logic
  const showSummary = ref<boolean>(false)
  const showSummaryForm = (): void => {
    resetFormVisibility() // Hide all forms
    showSummary.value = true // Show concerned form
    toggleModal() // Reveal modal
  }
  const editSummary = () => {
    isEdit.value = true // Set edit mode
    resetFormVisibility() // Hide all forms
    showSummary.value = true // Show concerned form
    toggleModal() // Reveal modal
  }
  const deleteSummary = async () => {
    await profileStore.setSummaryID('')
  }

  // Experience Logic
  const showExperience = ref<boolean>(false)
  const showExperienceForm = (): void => {
    resetFormVisibility() // Hide all forms
    showExperience.value = true // Show concerned form
    toggleModal() // Reveal modal
  }
  const editExperience = (id:string) => {
    isEdit.value = true // Set edit mode
    expIdToEdit.value = id // Reference the id to be loaded
    resetFormVisibility() // Hide all forms
    showExperience.value = true // Show concerned form
    toggleModal() // Reveal modal
  }
  const deleteExperience = async (id: string) => {
    await profileStore.deleteExperienceID(id)
  }


  // Global modal reseter
  const resetFormVisibility = () => {
    showSummary.value = false
    showExperience.value = false
  }
</script>

<style scoped>
    .profileContent{
        padding:10px;
        display: flex;
        flex-direction: column;
    }
    .toto {
        width:10px;
    }
</style>