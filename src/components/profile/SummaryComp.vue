<template>
    <div class="summaryBlock">
        <h3>Summary</h3>

        <section class="viewSummary borders profileData" v-if="summary?.id">
            <!-- make edit and delete summary -->
            <p>Your summary :</p>
            <span>{{ summary.summary }}</span>

            <p>Expected salary :</p>
            <span>{{ summary.salary }} euros</span>

            <p>Prefered company size :</p>
            <span>{{ config.companySize[parseInt(summary.companySize)-1].label }}</span>

            <p>Prefered company Type :</p>
            <span>{{ config.companyType[parseInt(summary.companyType)-1].label }}</span>
            <!-- show summary-->

            <div class="actions"> <!-- Make proper icons -->
              <button @click="editSummary">Edit</button>
              <button @click="deleteSummary">Delete</button>
            </div>
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
  import config from '@/../onceConfig'

  const emit = defineEmits(['addSummary', 'editSummary', 'deleteSummary'])
  const summaryStore = useSummaryStore();
  const {summary} = storeToRefs(summaryStore)
  const showCreateSummary = ref<boolean>(false)

  const toggleCreateSummary = (): void => {
    showCreateSummary.value = !showCreateSummary.value
    emit('addSummary')
  }

  const editSummary = () => {
    emit('editSummary')
    //console.log("edit summary");
  }
  const deleteSummary = async () => {
    //console.log("delete summary");
    await summaryStore.deleteSummary()
    emit('deleteSummary')
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