<template>
    <div>
        <h2>Profile</h2>
        <section class="profileContent">
            <!-- Summary block component -->
            <SummaryComp @addSummary="showSummaryForm" @editSummary="editSummary" @deleteSummary="deleteSummary"/>

            <ExperienceComp @addExperience="showExperienceForm" @editExperience="editExperience" @deleteExperience="deleteExperience"/>
            <!-- Experiences block component -->
            <!-- Language block component -->
            <!-- Skills block component -->
            <!-- Education block component -->


            
            
            <div v-if="showModal === true" class="modal" @click.self="closeModal">
                <!-- Show forms in here ? -->
                <SummaryForm v-if="showSummary === true" :isEdit="isEdit" @closeModal="closeModal"/>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
  import SummaryComp from '@/components/profile/SummaryComp.vue';
  import SummaryForm from '@/components/profile/SummaryForm.vue';
  import ExperienceComp from '@/components/profile/ExperienceComp.vue';
  import useProfileStore from '@/stores/profileStore';
  import { ref } from 'vue'

  const profileStore = useProfileStore()

  // Modal logic
  const isEdit = ref<boolean>(false)

  const showModal = ref<boolean>(false)
  const toggleModal = () => {
    showModal.value = !showModal.value
  }
  const closeModal = (): void => {
    showModal.value = false
    resetFormVisibility()
    isEdit.value = false
  }

  // Summary Logic
  const showSummary = ref<boolean>(false)
  const showSummaryForm = (): void => {
    showExperience.value = false;
    showSummary.value = true
    toggleModal()
  }
  const editSummary = () => {
    isEdit.value = true
    showExperience.value = false;
    showSummary.value = true
    toggleModal()
  }
  const deleteSummary = async () => {
    // set summaryID in profile to ''
    await profileStore.setSummaryID('')
    //await profileStore.updateProfile()
  }

  // Experience Logic
  const showExperience = ref<boolean>(false)
  const showExperienceForm = (): void => {
    console.log('showExperienceForm');
    showSummary.value = false
    showExperience.value = true;
    toggleModal()
  }
  const editExperience = () => {
    console.log('editExperience');
    isEdit.value = true
    showSummary.value = false
    showExperience.value = true
    toggleModal()
  }
  const deleteExperience = async (id: string) => {
    console.log(`deleteExperience with id ${id}`);
    await profileStore.deleteExperienceID(id)
  }


  // Global reseter
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