<template>
    <div>
        <form @submit.prevent="handleLogin" id="loginForm">
            <input type="text" placeholder="Enter your login..." v-model="login" required autofocus>
            <input type="password" placeholder="Enter your password..." v-model="password" required>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

            <button>Submit</button>
        </form>

        <div class="switchAuth">
            <span @click="handleSwitch('register')">Register</span> /
            <span @click="handleSwitch('forgot')">Forgot password</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import useAuthStore from '@/stores/authStore'
    import LogType from '@/types/LogType'

    // Utils
    import { Md5 } from 'ts-md5';
    import conf from '@/../onceConfig'

    const authStore = useAuthStore()

    // Login refs
    const login = ref<string>('')
    const password = ref<string>('')

    // Handling form swap based on LogTypes
    const handleSwitch = (mode: LogType): void => {
        authStore.setShowForm(mode)
    }

    // Handle login flow 
    const handleLogin = async (): Promise<void> => {
        const hashedLogin = Md5.hashStr(conf.salt + login.value)
        const hashedPassword = Md5.hashStr(conf.salt + password.value)

        await authStore.login(hashedLogin, hashedPassword)
            .then((/*res*/) => {
                /* Any after job */
            });
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
    .successText {
        color: var(--main-success-color);
    }
</style>