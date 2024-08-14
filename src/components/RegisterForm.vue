<template>
    <div>
        <form @submit.prevent="handleRegister">
            <input type="text" placeholder="Enter your login..." v-model="login" required autofocus>
            <input type="password" placeholder="Enter your password..." v-model="password" required>
            <input type="password" placeholder="Enter your password again..." v-model="confirmPassword" required>
            <input type="email" placeholder="Enter your email..." v-model="email" required>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>

            <button>Submit</button>
        </form>

        <div class="switchAuth">
            <span @click="handleSwitch('login')">Login</span> /
            <span @click="handleSwitch('forgot')">Forgot password</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Core methods
    import { ref } from 'vue'

    // AuthStore
    import useAuthStore from '@/stores/authStore'

    // Types
    import LogType from '@/types/LogType'

    const authStore = useAuthStore()

    // Login refs
    const login = ref<string>('')
    const password = ref<string>('')
    const confirmPassword = ref<string>('')
    const email = ref<string>('')

    // Handling form swap based on LogTypes
    const handleSwitch = (mode: LogType): void => {
        authStore.setShowForm(mode)
    }

    const handleRegister = () => {
        console.log("register handler")
        // check if fields are valid?

        //authStore.register(login.value, password.value, email.value);
    }
</script>

<style scoped>
    form {
        margin: 20px auto;
        display:flex;
        flex-direction: column;
        align-items: center;
    }
    input {
        margin: 10px 0;
    }
    button {
        margin-top:20px;
    }
    .switchAuth {
        margin-bottom:10px;
    }
    .switchAuth span {
        cursor:pointer;
    }
    .switchAuth span:hover {
        color: var(--main-text-color-hover);
    }
    .errorText {
        color: var(--main-error-color);
    }
</style>