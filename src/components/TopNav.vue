<template>
    <nav class="topNav">
      <router-link :to="{name:'dashboard'}" class="topNavLink">Dashboard</router-link> 
      <router-link :to="{name:'profile'}" class="topNavLink">Profile</router-link>
      <router-link :to="{name:'about'}" class="topNavLink">About</router-link>

      <!-- Show placeholder while authstore is not defined or null -->
      <template v-if="authStore.user && authStore.user.Status != undefined">
        <SelectComp :options="options" :currentValue="authStore.user.Status"/>
      </template>

      <div @click="handleLogout">Logout</div>
    </nav>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore';
  import SelectComp from './subcomponents/SelectComp.vue';
  import SelectItem from '@/types/SelectItem';

  const options: SelectItem[] = [
    {id:1, icon:"circle", text:"Available", class:"statusAvailable"},
    {id:2, icon:"circle", text:"Idle", class:"statusIdle"},
    {id:3, icon:"circle", text:"Not available", class:"statusNotAvailable"}
  ]
  
  const authStore = useAuthStore()
  const handleLogout = () => {
      authStore.logout()
  }
</script>

<style scoped>
    nav {
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
        font-weight: bold;
        color: var(--main-text-color-white);
    }
    nav button, nav .topNavLink {
        margin-left:10px;
        margin-right:10px;
    }
    .topNav {
        background-color: var(--main-bg-color);
    }
    div {
        cursor:pointer;
        margin-left: 10px;
    }
    nav {
      padding: 34.5px;
    }

    nav a {
        text-decoration:none;
        color: var(--main-text-color-white);
    }
    nav a:hover {
        color: var(--main-bg-color-darken);
    }

    nav a.router-link-exact-active {
        color: #2c3e50;
    }
    select {
        margin-left:5px;
        position:relative;
        bottom:2px;
        background-color: var(--main-bg-color);
    }
    .statusIcon {
        font-size:13px;
    }
</style>