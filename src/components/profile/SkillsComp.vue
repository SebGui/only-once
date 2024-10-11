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
                :max="conf.maxSkill"
                outer-class="customOuter"
              >
              <FormKit
                  type="autocomplete"
                  name="Skill"
                  label="Skill"
                  v-model="autoCompleteValue"
                  placeholder="Search for a skill of enter a new one"
                  :options="skillAsOption"
                  :option-loader="loadMovie"
                  @keyup.enter="test"
                  :onchange="test2"
                  outer-class="$reset customOuterAutocomplete"
                />

                <!-- If no solution found for icons not loading, add custom class and rework -->
                <FormKit
                  type="rating"
                  name="rating"  
                  label="Rate your expertise"
                  outer-class="$reset customOuterRating"
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
  import conf from '@/../onceConfig'
  import { ref } from 'vue';

  /*import { OptionLoader } from '@formkit/pro';
  import type { FormKitOptionsItem } from '@formkit/inputs';*/

  type SkillEntry = Record<string, string>

  // test valuws
  const skillsStore = {
    isLoading: false
  }
  const skills = [
    {id:1, skillName:"a skill", expertise: 5}
  ]
  console.log(skills);
  /*let skillAsOption = ref<object[]>([
    {label: 'VueJS', value: 'vueJs'}
  ])*/
  let skillAsOption:SkillEntry[] = ref<SkillEntry[]>([
    {label: 'VueJS', value: 'vueJs'}
  ])
  skillAsOption.value.push({label: 'test', value:'ing'})

  /*const loadSkill = (value: any, cachedItem:FormKitOptionsItem<any>): FormKitOptionsItem<any> => {//(objId:string, cachedOption:any): OptionLoader => {
    console.log("Here");
    //console.log("Here", objId, cachedOption);
    const title = ref<string>("1")
    const id = ref<string>("2")

    return {label:title.value, value:id.value}
  }*/
  async function loadMovie(id, cachedOption) {
    console.log("In load movie", id, cachedOption);
    return {
      label:"my",
      value: "test"
    }
}

  const autoCompleteValue = ref<string>("")
  const test = async (e) => {
    console.log('in test')
    //console.log(e.srcElement.form[1]._value);
    //console.log(autoCompleteValue.value)
    skillAsOption.value.push({label:e.srcElement.form[1]._value, value: 'ing3'})
    //autoCompleteValue.value = ""
    console.log(skillAsOption);
  }

  const test2 = (e) => {
    console.log(e);
  }
</script>

<style>
    .skillsBlock {}
    .customOuter {}
    .customOuterAutocomplete {margin: auto;width: 40%;}
    .customOuterRating{margin: auto;width: 40%;}
    .skillsBlock .formkit-content {
      display: flex !important;
      justify-content: center !important;
      flex-direction: row !important;
      font-size: 14px;/*make size for phone*/
    }
    .customOuterAutocomplete label {
      font-size: 15px;
    }
</style>