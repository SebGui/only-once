<template>
    <div class="floatingForm">
        <FormKit type="form" id="myForm" @submit="handleSubmit">

            <!-- Summary: Textarea -->
            <FormKit
                type="textarea"
                name="summary"
                label="Your summary"
                placeholder="Remember to write in complete summary."
                :help="`${summary ? summary.length : 0} / 500`"
                validation="length:0,500"
                validation-visibility="live"
                :validation-messages="{
                  length: 'Summary cannot be more than 500 characters.',
                }"
                v-model="summary"
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
              :options="[
                { label: 'Small (1 to 9)', value: '1'},
                { label: 'Medium (10 to 29)', value: '2'},
                { label: 'Large (30 to 49)', value: '3'},
                { label: 'Very large (50+)', value: '4' }
              ]"
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
              :options="[
                { label: 'Prefer not to say', value: '1'},
                { label: 'Any type', value: '2'},
                { label: 'Start-up', value: '3'},
                { label: 'Scale-up', value: '4' },
                { label: 'Large', value: '5' }
              ]"
              help="Don’t worry, you can’t get this one wrong."
              v-model="companyType"
            />
            {{ companyType }}
        </FormKit>
    </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import { FormKit } from '@formkit/vue';

  // Summary: textarea, salaryRange: string, expectedCompanyType: number, expectedCompanySize: number

  const summary = ref<string>('')
  const salary = ref<string>('60000')
  const companySize = ref<string>('')
  const companyType = ref<string>('')

  const emit = defineEmits(['closeModal'])

  const handleSubmit = (): void => {
    console.log('form submitted');

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