<template>
  <AuthView v-if="!isLoggedIn"/>

  <div v-if="isLoggedIn === true" class="mainContent">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <!-- Make nav component-->

    <!-- Make Sidebar component-->

    <router-view/>

    <!-- Make Footer component-->
  </div>
</template>

<script setup lang="ts">
  //import { storeToRefs } from 'pinia' 
  import useAuthStore from '@/stores/authStore'

  import AuthView from '@/views/AuthView.vue'
  import { storeToRefs } from 'pinia';
  import { inject, onMounted, onUpdated } from 'vue';
  import { VueCookies } from 'vue-cookies';

  const authStore = useAuthStore()
  const { isLoggedIn } = storeToRefs(authStore)

  const $cookies = inject<VueCookies>('$cookies');

  onMounted(() => {
    authStore.setCookieObj($cookies)
    authStore.checkLogStatus()
  })
  onUpdated(() => {
    authStore.checkLogStatus()
  })
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
