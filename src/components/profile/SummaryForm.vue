<template>
    <div class="floatingForm">
      <h1 v-if="props.isEdit === true">Edit summary</h1>
      <h1 v-else>Create summary</h1>

        <FormKit type="form" id="summaryForm" @submit="handleSubmit">

            <!-- Summary: Textarea -->
            <FormKit
                type="textarea"
                name="summary"
                label="Your summary"
                placeholder="Remember to write in complete summary."
                :help="`Maximum : ${summaryText ? summaryText.length : 0} / 500`"
                validation="length:0,500"
                validation-visibility="live"
                :validation-messages="{
                  length: 'Summary cannot be more than 500 characters.',
                }"
                v-model="summaryText"
            />

            <!-- Salary: Range -->
            <div class="salaryPicker">
               <FormKit
                 v-model="salary"
                 type="range"
                 label="Salary"
                 min="0"
                 max="500000"
                 outer-class="formNoBottomBorder"
               />
               <FormKit
                 class="toto"
                 type="number"
                 help="Select your Expected salary."
                 label=""
                 name="salary"
                 :value="salary"
                 v-model="salary"
                 step="1"
               />
            </div>

             <!-- companySize : dropdown -->
             <FormKit
              type="select"
              label="What size of company are you looking for?"
              name="companySize"
              placeholder="Select a company size"
              :options="config.companySize"
              help="Don’t worry, you can’t get this one wrong."
              v-model="companySize"
            />

            <!-- companyType : dropdown -->
            <FormKit
              type="select"
              label="What type of company are you looking for?"
              name="companyType"
              placeholder="Select a company type"
              :options="config.companyType"
              help="Don’t worry, you can’t get this one wrong."
              v-model="companyType"
              outer-class="formNoBottomBorder"
            />
        </FormKit>
    </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue'
  import { storeToRefs } from 'pinia';
  import { FormKit } from '@formkit/vue';

  // Stores import
  import useSummaryStore from '@/stores/summaryStore';
  import useProfileStore from '@/stores/profileStore';
  import idGenerator from '@/composables/utils/idGenerator';
  import Summary from '@/types/Summary';
  import config from '@/../onceConfig';

  // Stores init
  const summaryStore = useSummaryStore();
  const profileStore = useProfileStore();

  // Summary ref
  const {summary} = storeToRefs(summaryStore)

  // Prop init
  const props = defineProps({'isEdit' : {required : true}})

  // Default refs
  // Could add default values to OnceConfig here
  const summaryText = ref<string>('')
  const salary = ref<string>('60000')
  const companySize = ref<string>('')
  const companyType = ref<string>('')

  // If props "edit" exists, load summary as those refs
  if (props.isEdit === true && summary.value) {
    summaryText.value = summary.value.summary
    salary.value = summary.value.salary
    companySize.value = summary.value.companySize
    companyType.value = summary.value.companyType
  }

  // Emit definition
  const emit = defineEmits(['closeModal'])

  const handleSubmit = (): void => {
    if (summary.value !== null && props.isEdit === true) {
      // Submit as edit mode
      editSummary()
    } else {
      // Submit as add mode
      addSummary()
    }

    // Close modal [ToDo] : spinner & success
    emit('closeModal')
  }

  const editSummary = async () => {
    if (summary.value !== null) {
      // Update summary values
      summary.value.summary = summaryText.value
      summary.value.salary = salary.value
      summary.value.companySize = companySize.value
      summary.value.companyType = companyType.value
      summary.value.updatedAt = new Date().getTime()

      // Sync to DB
      await summaryStore.updateSummary()
    }
  }

  const addSummary = async () => {
    // New Summary object init
    const newSummary: Summary = {
      id: idGenerator(8),
      summary: summaryText.value,
      salary: salary.value,
      companyType: companyType.value,
      companySize: companySize.value,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }

    // Set summary to profile on add summary to DB + update local store summary ref
    if (await summaryStore.addSummary(newSummary)) {
      await profileStore.setSummaryID(newSummary.id)
      await profileStore.updateProfile()
    }
  }

  // Add firstname, lastname, profilePicture, phoneNumber, address?vue-google-autocomplete
</script>

<style scoped>
    #summaryForm {
        width:60%;
    }
</style>