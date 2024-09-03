<template>
    <div class="summaryBlock">
        <h3>Summary</h3>

        <section class="viewSummary borders profileData" v-if="summary?.id"> <!-- @mouseenter="showActions = true" @mouseleave="showActions = false" --> 
            <ActionsComp @deleteClicked="handleDelete" @editClicked="handleEdit"/> <!-- v-if="showActions === true" -->

            <p>Your summary :</p>
            <span>{{ summary.summary }}</span>

            <p>Expected salary :</p>
            <span>{{ summary.salary }} euros</span>

            <p>Prefered company size :</p>
            <span>{{ config.companySize[parseInt(summary.companySize)-1].label }}</span>

            <p>Prefered company Type :</p>
            <span>{{ config.companyType[parseInt(summary.companyType)-1].label }}</span>

        </section>
        <section @click="toggleCreateSummary" class="clickableSection createSummary" v-else>
            <!--show create summary form-->
            <h3>Create summary</h3>
        </section>
    </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'
  import useSummaryStore from '@/stores/summaryStore';
  import { storeToRefs } from 'pinia';
  import config from '@/../onceConfig';
  import ActionsComp from '../subcomponents/ActionsComp.vue';

  // Emit custom events setup
  const emit = defineEmits(['addSummary', 'editSummary', 'deleteSummary'])

  // Store setup
  const summaryStore = useSummaryStore();
  const {summary} = storeToRefs(summaryStore)

  // Conditionnal rendering
  const showCreateSummary = ref<boolean>(false)
  //const showActions = ref<boolean>(false)

  // Logic functions
  const toggleCreateSummary = (): void => {
    showCreateSummary.value = !showCreateSummary.value
    emit('addSummary', 'summary') // emitName, formType
  }

  // Emmiter for hadnlers
  const editSummary = () => {
    emit('editSummary', 'summary', true) // emitName, formType, editMode
  }
  const deleteSummary = async () => {
    await summaryStore.deleteSummary()
    emit('deleteSummary')
  }

  // Handlers from listeners
  const handleDelete = () => {
    deleteSummary()
  }
  const handleEdit = () => {
    editSummary()
  }
</script>

<style scoped>
    .summaryBlock {
        width:100%;
    }
    .createSummary {}
    .viewSummary {
      padding-bottom: 15px;
    }
</style>