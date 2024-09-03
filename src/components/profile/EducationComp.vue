<template>
    <section class="educationBlock">
        <h3>Education</h3>

        <!-- Spinner template check-->
        <template v-if="educationStore.isLoading === true"> 
           <OnceSpinner className="spinnerInProfile" size="80" color="var(--main-bg-color)" />
        </template>
        <template v-else>
            <section v-if="educations.length > 0" @click="toggleCreateEducation" class="clickableSection createEducation createEducationSmall">
                <span>Add Education</span>
            </section>

            <section class="viewEducation borders profileData" v-if="educations.length > 0"> <!-- @mouseenter="showActions = true" @mouseleave="showActions = false" --> 

                <div class="singleEducation borders" v-for="item in educations" :key="item.id">
                    <ActionsComp @deleteClicked="handleDelete(item.id)" @editClicked="handleEdit(item.id)"/>

                    <p>School name :</p>
                    <span>{{ item.schoolName }}</span>

                    <p>Degree :</p>
                    <span>{{ item.degreeName }}</span>

                    <p>Description :</p>
                    <span>{{ item.educationDesc }}</span>

                    <p>Started on :</p>
                    <span>{{ new Date(item.startedOn).toDateString() }}</span>

                    <p>Ended on :</p>
                    <span>{{ new Date(item.endedOn).toDateString() }}</span>
                </div>
            </section>
            <section @click="toggleCreateEducation" class="clickableSection createEducation" v-else>
                <!--show create summary form-->
                <h3>Create Education</h3>
            </section>
        </template>
    </section>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import useEducationStore from '@/stores/educationStore';
  import { storeToRefs } from 'pinia';
  import ActionsComp from '../subcomponents/ActionsComp.vue';
  import OnceSpinner from '../subcomponents/OnceSpinner.vue';

  // Emit custom events setup
  const emit = defineEmits(['addEducation', 'editEducation', 'deleteEducation'])

  // Store setup
  const educationStore = useEducationStore();
  const {educations} = storeToRefs(educationStore)

  // Conditionnal rendering
  const showCreateEducation = ref<boolean>(false)
  //const showActions = ref<boolean>(false)

  // Logic functions
  const toggleCreateEducation = (): void => {
    showCreateEducation.value = !showCreateEducation.value
    emit('addEducation', 'education') // emitName, formType
  }

  // Emitters from handlers
  const editEducation = (id:string) => {
    emit('editEducation', 'education', true, id) // emitName, formType, editMode, Id
  }
  const deleteEducation = async (id:string) => {
    await educationStore.deleteEducation(id)
    //emit('deleteEducation', id) // Now useless with new logic
  }

  // Direct listeners handleers
  const handleDelete = (id:string) => {
    deleteEducation(id)
  }
  const handleEdit = (id:string) => {
    editEducation(id)
  }
</script>

<style scoped>
.educationBlock {
  width:100%;
}
.createEducationSmall {
  height:18px;
  width: 65%;
  margin: auto;
  padding: 5px;
}
.singleEducation {
  padding: 10px 10px 35px 10px;
}
</style>