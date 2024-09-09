<template>
    <div class="floatingForm">
      <h1 v-if="props.isEdit === true">Edit education</h1>
      <h1 v-else>Create education</h1>

      <FormKit type="form" id="educationForm" @submit="handleSubmit">
            <FormKit
              type="text"
              label="School name"
              placeholder="The name of your school"
              help="Enter the name of your school"
              prefix-icon="text"
              v-model="schoolName"
            />

            <FormKit
              type="text"
              label="Degree"
              placeholder="Enter the name of you degree"
              help="Enter the name of the degree"
              prefix-icon="text"
              v-model="degreeName"
            />

            <FormKit
              type="textarea"
              name="educationDesc"
              label="Describe what you did in your degree"
              placeholder="Remember to write in complete sentences."
              :help="`${educationDesc ? educationDesc.length : 0} / 360`"
              validation="length:0,360"
              validation-visibility="live"
              :validation-messages="{
                length: 'Education description cannot be more than 360 characters.',
              }"
              prefix-icon="textarea"
              v-model="educationDesc"
            />

            <FormKit
              type="date"
              label="Start date"
              help="Enter when did you start your degree"
              :validation="`required|date_before:${endedOn}`"
              validation-visibility="live"
              :max="today"
              v-model="startedOn"
            />

            <FormKit
              type="date"
              label="End date"
              help="Enter when you ended (Today if you are still in position)"
              :validation="`required|date_after:${startedOn}`"
              validation-visibility="live"
              outer-class="formNoBottomBorder"
              v-model="endedOn"
            />
            <!-- Make checkbox for "Still in this position" -->

        </FormKit>
    </div>
</template>

<script setup lang="ts">
  import useEducationStore from '@/stores/educationStore';
  import useAuthStore from '@/stores/authStore';
  import idGenerator from '@/composables/utils/idGenerator';
  import {defineProps, ref, defineEmits} from 'vue'
  import Education from '@/types/Education';

  // Props declaration
  const props = defineProps({
      isEdit : {
          required: false,
          type: Boolean
      },
      eduID : {
        required: false,
        type: String
      }
  })

  const emit = defineEmits(['closeModal'])

  const today = new Date().toISOString().split('T')[0]

  // education store init
  const educationStore = useEducationStore()
  const authStore = useAuthStore()

  // Default value for create experience
  const schoolName  = ref<string>('')
  const degreeName  = ref<string>('')
  const educationDesc = ref<string>('')
  const startedOn = ref<string>('')
  const endedOn = ref<string>('')


  // Setups for edit experience
  let currentEducation
  if (props.eduID) // Get experience from given experience id
    currentEducation = educationStore.getEducationWithId(props.eduID)

  // Load values in refs for edit mode form
  if (props.isEdit === true && currentEducation) {
    schoolName.value = currentEducation.schoolName
    degreeName.value = currentEducation.degreeName
    educationDesc.value = currentEducation.educationDesc
    startedOn.value = new Date(currentEducation.startedOn).toISOString().split('T')[0] // Format date following FormKit requirement : yyyy-mm-dd
    endedOn.value = new Date(currentEducation.endedOn).toISOString().split('T')[0] // Format date following FormKit requirement : yyyy-mm-dd
  }

  // Handle form submit
  const handleSubmit = async (): Promise<void> => {
    // Edit experience
    if (props.isEdit === true && props.eduID) {
      editEducation()
    } else {
      addEducation()
    }

    // Hide modal
    emit('closeModal')
  }

  const editEducation = async () => {
    if (props.eduID && authStore.user) {
      // Experience object init
      const updatedEducation:Education = {
          id: props.eduID,
          userID: authStore.user.userID,
          schoolName: schoolName.value,
          degreeName: degreeName.value,
          educationDesc: educationDesc.value,
          startedOn: new Date(startedOn.value).getTime(),
          endedOn: new Date(endedOn.value).getTime(),
          createdAt: currentEducation.createdAt,
          updatedAt: new Date().getTime(),
      }

      // Start update experience flow
      await educationStore.updateEducation(updatedEducation)
    }
  }

  const addEducation = async () => {
    // Experience object init
    if (authStore.user) {
        const newEducation:Education = {
           id: idGenerator(8),
           userID: authStore.user.userID,
           schoolName: schoolName.value,
           degreeName: degreeName.value,
           educationDesc: educationDesc.value,
           startedOn: new Date(startedOn.value).getTime(),
           endedOn: new Date(endedOn.value).getTime(),
           createdAt: new Date().getTime(),
           updatedAt: new Date().getTime(),
        }

        // AddExperience DB sync
        await educationStore.addEducation(newEducation)
    }
  }
</script>

<style scoped>
    #educationForm {
        width:60%;
    }
</style>