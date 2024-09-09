<template>
    <section class="experienceBlock">
        <h3>Experience</h3>

        <template v-if="experienceStore.isLoading === true"> 
          <OnceSpinner className="spinnerInProfile" size="80" color="var(--main-bg-color)" />
        </template>
        <template v-else>

          <section v-if="experiences.length > 0" @click="toggleCreateExperience" class="clickableSection createExperience createExperienceSmall">
              <span>Add Experience</span>
          </section>

          <section class="viewExperience borders profileData" v-if="experiences.length > 0"> <!-- @mouseenter="showActions = true" @mouseleave="showActions = false" --> 

              <div class="singleExperience borders" v-for="item in experiences" :key="item.id">
                  <ActionsComp @deleteClicked="handleDelete(item.id)" @editClicked="handleEdit(item.id)" class="adjustExperienceActions"/>

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
              <!--show create experience form-->
              <h3>Create Experience</h3>
          </section>

        </template>
      </section>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import useExperienceStore from '@/stores/experienceStore';
  import { storeToRefs } from 'pinia';
  import ActionsComp from '../subcomponents/ActionsComp.vue';
  import OnceSpinner from '../subcomponents/OnceSpinner.vue';

  // Emit custom events setup
  const emit = defineEmits(['addExperience', 'editExperience', 'deleteExperience'])

  // Store setup
  const experienceStore = useExperienceStore();
  const {experiences} = storeToRefs(experienceStore)

  // Conditionnal rendering
  const showCreateExperience = ref<boolean>(false)
  //const showActions = ref<boolean>(false)

  // Logic functions
  const toggleCreateExperience = (): void => {
    showCreateExperience.value = !showCreateExperience.value
    emit('addExperience', 'experience') // emitName, formType
  }

  // Emitters from handlers
  const editExperience = (id:string) => {
    emit('editExperience', 'experience', true, id) // emitName, formType, editMode, Id
  }
  const deleteExperience = async (id:string) => {
    await experienceStore.deleteExperience(id)
    emit('deleteExperience', id)
  }

  // Direct listeners handleers
  const handleDelete = (id:string) => {
    deleteExperience(id)
  }
  const handleEdit = (id:string) => {
    editExperience(id)
  }

</script>

<style scoped>
.experienceBlock {
  width:100%;
}
.adjustExperienceActions {
  bottom:17px;
}
.createExperienceSmall {
  height:18px;
  width: 65%;
  margin: auto;
  padding: 5px;
}
.singleExperience {
  padding: 10px 10px 35px 10px;
}
</style>