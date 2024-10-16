<template>
    <div>
        <!--<h1>Auth page</h1>-->

        <div class="borders loginContent">
            <LoginForm v-if="showForm === 'login'" />
            <RegisterForm v-if="showForm === 'register'"/>
            <ForgotPasswordForm v-if="showForm === 'forgot'"/>
        </div>
    </div>
</template>

<script setup lang="ts">
  import useAuthStore from "@/stores/authStore";
  import { storeToRefs } from "pinia";

  import LoginForm from '@/components/auth/LoginForm.vue'
  import RegisterForm from '@/components/auth/RegisterForm.vue'
  import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'

  const authStore = useAuthStore();
  const { showForm } = storeToRefs(authStore)
</script>

<style scoped>
    .loginContent {
        background-color: var(--main-bg-color);
    }
    .borders {
        max-width: 1000px;
    }

    /* Tablet */
    @media (max-width: 1024px) {
        .loginContent {
            background-color:yellow;/* toRemove() */
            width: 100vw;
            height: 100vh;
            border: none;
            border-radius: 0px;
            position: absolute;
            top: 0;
            margin: 0;
        }
    }
    /* Phone */
    @media (max-width: 768px) {
        .loginContent {
            background-color:blue;/* toRemove() */
            width: 100vw;
            height: 100vh;
            border: none;
            border-radius: 0px;
            position: absolute;
            top: 0;
            margin: 0;
        }
    }
</style>