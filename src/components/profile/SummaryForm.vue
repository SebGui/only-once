<template>
    <div class="floatingForm">
        <FormKit type="form" id="myForm" @submit="handleSubmit">

            <!-- Summary: Textarea -->
            <FormKit
                type="textarea"
                name="summary"
                label="Your summary"
                placeholder="Remember to write in complete summary."
                :help="`${summaryText ? summaryText.length : 0} / 500`"
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
                 help="Select your Expected salary."
               />
               <FormKit
                 class="toto"
                 type="number"
                 help="Adjust your expected salary"
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
            {{ companySize }}

            <!-- companyType : dropdown -->
            <FormKit
              type="select"
              label="What type of company are you looking for?"
              name="companyType"
              placeholder="Select a company type"
              :options="config.companyType"
              help="Don’t worry, you can’t get this one wrong."
              v-model="companyType"
            />
            {{ companyType }}
        </FormKit>
    </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits, defineProps } from 'vue'
  import { FormKit } from '@formkit/vue';
  import useSummaryStore from '@/stores/summaryStore';
  import useProfileStore from '@/stores/profileStore';
  import idGenerator from '@/composables/utils/idGenerator';
  import Summary from '@/types/Summary';
  import config from '@/../onceConfig';
import { storeToRefs } from 'pinia';

  // Summary: textarea, salaryRange: string, expectedCompanyType: number, expectedCompanySize: number

  const summaryStore = useSummaryStore();
  const profileStore = useProfileStore();

  const {summary} = storeToRefs(summaryStore)

  const props = defineProps({'isEdit' : {required : true}})

  // If props "edit" exists, load summary as those refs
  const summaryText = ref<string>('')
  const salary = ref<string>('60000')
  const companySize = ref<string>('')
  const companyType = ref<string>('')
  if (props.isEdit === true && summary.value) {
    summaryText.value = summary.value.summary
    salary.value = summary.value.salary
    companySize.value = summary.value.companySize
    companyType.value = summary.value.companyType
  }

  const emit = defineEmits(['closeModal'])

  const handleSubmit = async (): Promise<void> => {
    if (summary.value !== null && props.isEdit === true) {
      summary.value.summary = summaryText.value
      summary.value.salary = salary.value
      summary.value.companySize = companySize.value;
      summary.value.companyType = companyType.value

      await summaryStore.updateSummary()
      emit('closeModal')
      return
    }
    console.log("add summaryu");
    // Set summary to add to DB
    const summaryID: string = idGenerator(8)
    const newSummary: Summary = {
      id: summaryID,
      summary: summaryText.value,
      salary: salary.value,
      companyType: companyType.value,
      companySize: companySize.value,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }

    // Set summary to profile on add summary to DB
    if (await summaryStore.addSummary(newSummary)) {
      await profileStore.setSummaryID(newSummary.id)
      await profileStore.updateProfile()
    }

    //Make a view for data succesfully saved
    emit('closeModal')
  }
  // Add firstname, lastname, profilePicture, phoneNumber, address?vue-google-autocomplete
</script>

<style scoped>
    div {
        background-color: var(--main-bg-white);
        margin: auto auto;
        position: relative;
        top: 5%;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        width: 80%;
    }
    #myForm {
        width:600px;
    }
</style>