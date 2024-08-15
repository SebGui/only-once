<template>
    <div>
        <h1>Auth page</h1>

        <div class="borders">
            <LoginForm v-if="showForm === 'login'" />
            <RegisterForm v-if="showForm === 'register'"/>
            <ForgotPasswordForm v-if="showForm === 'forgot'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
  import useAuthStore from "@/stores/authStore";
  import { storeToRefs } from "pinia";

  import LoginForm from '@/components/LoginForm.vue'
  import RegisterForm from '@/components/RegisterForm.vue'
  import ForgotPasswordForm from '@/components/ForgotPasswordForm.vue'

  const authStore = useAuthStore();
  const { showForm } = storeToRefs(authStore)
</script>

<style scoped>
    .borders {
        max-width: 1000px;
    }
</style>