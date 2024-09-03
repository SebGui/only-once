<template>
    <div>
        <h2>Profile</h2>
        <section class="profileContent">
            <!-- Summary block component -->
            <SummaryComp @addSummary="showForm" @editSummary="showForm" @deleteSummary="deleteSummaryFromProfile"/>

            <!-- Experiences block component -->
            <ExperienceComp @addExperience="showForm" @editExperience="showForm" @deleteExperience="deleteExperienceFromProfile"/>

            <!-- Education block component -->
            <EducationComp @addEducation="showForm" @editEducation="showForm"/>

            <!-- Language block component -->
            <!-- Skills block component -->

            <div v-if="showModal === true" class="modal" @click.self="closeModal">
                <!-- Show forms in here ? -->
                <SummaryForm v-if="showSummary === true" :isEdit="isEdit" @closeModal="closeModal"/>
                <ExperienceForm v-if="showExperience === true" :isEdit="isEdit" :expID="idToEdit" @closeModal="closeModal"/>
                <EducationForm v-if="showEducation === true" :isEdit="isEdit" :eduID="idToEdit" @closeModal="closeModal"/>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
  // Summary imports
  import SummaryComp from '@/components/profile/SummaryComp.vue';
  import SummaryForm from '@/components/profile/SummaryForm.vue';

  // Experience imports
  import ExperienceComp from '@/components/profile/ExperienceComp.vue';
  import ExperienceForm from '@/components/profile/ExperienceForm.vue';

  // Education imports
  import EducationComp from '@/components/profile/EducationComp.vue';
  import EducationForm from '@/components/profile/EducationForm.vue';

  // Types store and core imports
  import useProfileStore from '@/stores/profileStore';
  import formType from '@/types/FormType';
  import { ref } from 'vue'

  const profileStore = useProfileStore()

  // Modal logic
  const isEdit = ref<boolean>(false) // Control edit mode
  const idToEdit = ref<string>(''); // Bears the concerned element id

  // Form to be revealed on modal view
  const showSummary = ref<boolean>(false)
  const showExperience = ref<boolean>(false)
  const showEducation = ref<boolean>(false)

  const showModal = ref<boolean>(false)

  const toggleModal = () => {
    showModal.value = !showModal.value // Reveals the modal vie
  }
  const closeModal = (): void => {
    showModal.value = false;
    resetFormVisibility() // Hide all forms
    isEdit.value = false // Set edit to false
  }

  // The parameters are passed from the @/components/profile/${ModuleName}Comp.vue (emit params)
  const showForm = (type:formType, edit?:boolean, id?:string): void => {
    //console.log(type, edit, id);

    // Construct editMode if true
    if (edit === true) {
      isEdit.value = true
      if (id !== undefined)
        idToEdit.value = id
    }

    // Hide all forms
    resetFormVisibility()

    // Set concerned type to true
    switch (type) {
      case 'summary':
        showSummary.value = true
        break;
      case 'experience':
        showExperience.value = true
        break;
      case 'education':
        showEducation.value = true
        break;
      default:
        console.log(`Sorry, we are out of ${type}.`);
    }

    // Reveal modal with defined presets
    toggleModal()
  }

  const deleteSummaryFromProfile = async () => {
    await profileStore.setSummaryID('')
  }

  const deleteExperienceFromProfile = async (id: string) => {
    await profileStore.deleteExperienceID(id)
  }

  // Global modal reseter
  const resetFormVisibility = () => {
    showSummary.value = false
    showExperience.value = false
    showEducation.value = false
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