<template>
    <section class="skillsBlock">
        <h2>Skills</h2>

        <template v-if="skillsStore.isLoading === true"> 
          <OnceSpinner className="spinnerInProfile" size="80" color="var(--main-bg-color)" />
        </template>
        <template v-else>
            <!-- Use in : repeater -> rating, autocomplete -->

            <FormKit
              #default="{ value }"
              type="form"
              :actions="false"
            >
              <FormKit
                id="repeater"
                name="skills"
                type="repeater"
                label="skills"
                min="1"
                max="20"
              >
              <FormKit
                  type="autocomplete"
                  name="Skill"
                  label="Skill"
                  placeholder="Search for a skill of enter a new one"
                  :options="skillAsOption"
                  popover
                />

                <!-- If no solution found for icons not loading, add custom class and rework -->
                <FormKit
                  type="rating"
                  name="rating"  
                  label="How would you rate your expertise"
                />
              </FormKit>
              <pre wrap>{{ value }}</pre>
            </FormKit>
        </template>

    </section>
</template>

<script setup lang="ts">
  import { FormKit } from '@formkit/vue';
  import OnceSpinner from '@/components/subcomponents/OnceSpinner.vue'

  // test valuws
  const skillsStore = {
    isLoading: false
  }
  const skills = [
    {id:1, skillName:"a skill", expertise: 5}
    ]
  const skillAsOption = [
    {label: 'VueJS', value: 'vueJs'}
  ]
</script>

<style scoped>
    .skillsBlock {}
</style>