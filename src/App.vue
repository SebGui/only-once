<template>
  <AuthView v-if="!isLoggedIn"/>

  <div v-if="isLoggedIn === true" class="mainContent">
    <SideBarView/>

    <ContentView />
    <!-- Make Footer component-->
  </div>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore'

  import AuthView from '@/views/AuthView.vue'
  import { storeToRefs } from 'pinia';
  import { inject, onUpdated, onBeforeMount } from 'vue';
  import { VueCookies } from 'vue-cookies';

  import SideBarView from './views/SideBarView.vue';
  import ContentView from './views/ContentView.vue';

  //import router from './router'

  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const $cookies = inject<VueCookies>('$cookies');

  // Authentication check global router way
  /*router.beforeEach(async (to, from) => {
    authStore.checkLogStatus()
    if (authStore.isLoggedIn === false) return '/auth'
  })*/

  // Authentication check lifecycle hooks way
  onBeforeMount(() => {
    authStore.setCookieObj($cookies)
    authStore.checkLogStatus()
  })

  onUpdated(() => {
    authStore.checkLogStatus()
  })
</script>

<style>
</style>
