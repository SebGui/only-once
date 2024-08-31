<template>
    <div class="experienceBlock">
        <h3>Experience</h3>

        <section class="viewExperience borders profileData" v-if="experiences.length > 0"> <!-- @mouseenter="showActions = true" @mouseleave="showActions = false" --> 
            <div class="singleExperience" v-for="item in experiences" :key="item.id">
                <ActionsComp @deleteClicked="handleDelete" @editClicked="handleEdit"/>

                <p>Experience name :</p>
                <span>{{ item.expName }}</span>

                <p>Company name :</p>
                <span>{{ item.companyName }}</span>

                <p>Experience description :</p>
                <span>{{ item.expDesc }}</span>

                <p>Started on :</p>
                <span>{{ new Date(item.startedOn).toDateString() }}</span>

                <p>Ended on :</p>
                <span>{{ new Date(item.endedOn).toDateString() }}</span>
            </div>
        </section>
        <section @click="toggleCreateExperience" class="clickableSection createExperience" v-else>
            <!--show create summary form-->
            <h3>Create Experience</h3>
        </section>
    </div>
</template>

<script setup lang="ts">
      import { ref, defineEmits } from 'vue'
  import useExperienceStore from '@/stores/experienceStore';
  import { storeToRefs } from 'pinia';
  import conf from '@/../onceConfig';
  import ActionsComp from '../subcomponents/ActionsComp.vue';

  // Emit custom events setup
  const emit = defineEmits(['addExperience', 'editExperience', 'deleteExperience'])

  // Store setup
  const experienceStore = useExperienceStore();
  const {experiences} = storeToRefs(experienceStore)

  // Conditionnal rendering
  const showCreateExperience = ref<boolean>(false)
  const showActions = ref<boolean>(false)

  // Logic functions
  const toggleCreateExperience = (): void => {
    showCreateExperience.value = !showCreateExperience.value
    emit('addExperience')
  }

  const editExperience = () => { // add id
    emit('editExperience') // add id
  }
  const deleteExperience = async (id:string) => { // add id
    await experienceStore.deleteExperience(id)
    emit('deleteExperience') // ad id
  }

  const handleDelete = (id:string) => { // add id
    if (conf.devMode === true) {console.log(`Delete Experience with id :  ${id}`);}
    deleteExperience(id) // add id
  }
  const handleEdit = () => { // add id
    console.log("Edit");
    editExperience() // add id
  }

</script>

<style scoped>
.experienceBlock {
        width:100%;
    }
</style>