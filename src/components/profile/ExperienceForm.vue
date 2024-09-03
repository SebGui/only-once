<template>
    <div class="floatingForm">
      <h1 v-if="props.isEdit === true">Edit experience</h1>
      <h1 v-else>Create experience</h1>

        <FormKit type="form" id="experienceForm" @submit="handleSubmit">
            <FormKit
              type="text"
              label="Position name"
              placeholder="What did you do in this company"
              help="Enter the name of your position"
              prefix-icon="text"
              v-model="expName"
            />

            <FormKit
              type="text"
              label="Company name"
              placeholder="Enter the name of the company"
              help="Enter the name of the company"
              prefix-icon="text"
              v-model="companyName"
            />

            <FormKit
              type="textarea"
              name="expDesc"
              label="Describe what you did in this position"
              placeholder="Remember to write in complete sentences."
              :help="`${expDesc ? expDesc.length : 0} / 360`"
              validation="length:0,360"
              validation-visibility="live"
              :validation-messages="{
                length: 'Experience description cannot be more than 360 characters.',
              }"
              prefix-icon="textarea"
              v-model="expDesc"
            />

            <FormKit
              type="date"
              label="Start date"
              help="Enter your first day date in that company"
              :validation="`required|date_before:${endedOn}`"
              validation-visibility="live"
              v-model="startedOn"
            />

            <FormKit
              type="date"
              label="End date"
              help="Enter your last day date in that company (Today if you are still in position)"
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
  import idGenerator from '@/composables/utils/idGenerator';
  import useExperienceStore from '@/stores/experienceStore';
  import useProfileStore from '@/stores/profileStore';
  import Experience from '@/types/Experience';
  import {defineProps, ref, defineEmits} from 'vue'

  // Props declaration
  const props = defineProps({
      isEdit : {
          required: false,
          type: Boolean
      },
      expID : {
        required: false,
        type: String
      }
  })

  const emit = defineEmits(['closeModal'])

  // Experience store init
  const experienceStore = useExperienceStore();

  // Default value for create experience
  const expName  = ref<string>('')
  const companyName  = ref<string>('')
  const expDesc = ref<string>('')
  const startedOn = ref<string>('')
  const endedOn = ref<string>('')


  // Setups for edit experience
  let currentExperience
  if (props.expID) // Get experience from given experience id
    currentExperience = experienceStore.getExperienceWithId(props.expID)

  // Load values in refs for edit mode form
  if (props.isEdit === true && currentExperience) {
    expName.value = currentExperience.expName
    companyName.value = currentExperience.companyName
    expDesc.value = currentExperience.expDesc
    startedOn.value = new Date(currentExperience.startedOn).toISOString().split('T')[0] // Format date following FormKit requirement : yyyy-mm-dd
    endedOn.value = new Date(currentExperience.endedOn).toISOString().split('T')[0] // Format date following FormKit requirement : yyyy-mm-dd
  }

  // Handle form submit
  const handleSubmit = async (): Promise<void> => {
    // Edit experience
    if (props.isEdit === true && props.expID) {
      editExperience()
    } else {
      addExperience()
    }

    // Hide modal
    emit('closeModal')
  }

  const editExperience = async () => {
    if (props.expID) {
      // Experience object init
      const updatedExperience:Experience = {
          id: props.expID,
          expName: expName.value,
          companyName: companyName.value,
          expDesc: expDesc.value,
          startedOn: new Date(startedOn.value).getTime(),
          endedOn: new Date(endedOn.value).getTime(),
          createdAt: currentExperience.createdAt,
          updatedAt: new Date().getTime(),
      }

      // Start update experience flow
      await experienceStore.updateExperience(updatedExperience)
    }
  }

  const addExperience = async () => {
    // Add experience
    const profileStore = useProfileStore()

    // Experience object init
    const newExperience:Experience = {
        id: idGenerator(8),
        expName: expName.value,
        companyName: companyName.value,
        expDesc: expDesc.value,
        startedOn: new Date(startedOn.value).getTime(),
        endedOn: new Date(endedOn.value).getTime(),
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
    }

    // AddExperience DB sync
    await experienceStore.addExperience(newExperience).then(() => {
        profileStore.addExperienceID(newExperience.id)
    })
  }
</script>

<style scoped>
    #experienceForm {
        width:60%;
    }
</style>