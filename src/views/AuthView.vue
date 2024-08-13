<template>
    <div>
        <h1>Auth page</h1>

        <div class="borders">
            <LoginForm v-if="showForm === 'login'" />
            <h2 v-if="showForm === 'register'">Register form</h2>
            <h2 v-if="showForm === 'forgot'">Forgot Password form</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
  import useAuthStore from "@/stores/authStore";
  import { storeToRefs } from "pinia";

  import LoginForm from '@/components/LoginForm.vue'

  const authStore = useAuthStore();
  const { showForm } = storeToRefs(authStore)
</script>

<style scoped>

</style>