<template>
    <div class="summaryBlock">
        <section class="viewSummary" v-if="summaryBlockExists === true">
            <h3>Show summary</h3>
            <!-- show summary-->
        </section>
        <section @click="toggleCreateSummary" class="clickableSection createSummary" v-else>
            <!--show create summary form-->
                <h3>Create summary</h3>
        </section>
    </div>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue'

  const emit = defineEmits(['showAddSummary'])

  const summaryBlockExists = ref<boolean>(false)
  const showCreateSummary = ref<boolean>(false)
  //const showModal = ref<boolean>(false)

  const checkSummaryBlock = ():void => {
    console.log('checkSummary');
  }
  checkSummaryBlock();

  const toggleCreateSummary = (): void => {
    showCreateSummary.value = !showCreateSummary.value
    emit('showAddSummary')
  }
  // In a section
  // If profileID returns something, show it with edit button
  // else Show add summary button
</script>

<style scoped>
    .summaryBlock {
        width:100%;
    }
    .createSummary {}
    .viewSummary {}
</style>