<template>
    <div>
        <form @submit.prevent="handleRegister" id="registerForm">
            <input type="text" placeholder="Enter your login..." v-model="login" required autofocus>
            <input type="password" placeholder="Enter your password..." v-model="password" required>
            <input type="password" placeholder="Enter your password again..." v-model="confirmPassword" required>
            <input type="email" placeholder="Enter your email..." v-model="email" required>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

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

    // Utils
    import {Md5} from 'ts-md5';
    import conf from '@/../onceConfig'

    // Dev log
    import myLog from '@/composables/utils/myLog';

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
        myLog("register handler")
        // Salt and hash user data
        const hashedLogin = Md5.hashStr(conf.salt + login.value)
        const hashedPassword = Md5.hashStr(conf.salt + password.value)
        const hashedConfirmPassword = Md5.hashStr(conf.salt + confirmPassword.value)

        // check if fields are valid?
        if (hashedPassword === hashedConfirmPassword) {
            authStore.register(hashedLogin, hashedPassword, email.value);
        } else {
            authStore.setErrorText("The password and the confirmation are different")
            // Highlight field ?
        }

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