<template>
    <div class="registerContainer">
        <!-- Mobile & tab icon -->
        <div class="registerIcon">
            <i class="material-icons">app_registration</i>
         </div>

        <form @submit.prevent="handleRegister" id="registerForm">
            <input type="text" placeholder="Enter your login..." v-model="login" required autofocus>
            <input type="password" placeholder="Enter your password..." v-model="password" required>
            <input type="password" placeholder="Enter your password again..." v-model="confirmPassword" required>
            <input type="email" placeholder="Enter your email..." v-model="email" required>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

            <button>
                <i class="material-icons">app_registration</i>
                Submit
            </button>
        </form>

        <div class="switchAuth">
            <button @click="handleSwitch('login')">
                <i class="material-icons">login</i>
                Login
            </button>

            <button @click="handleSwitch('forgot')">
                <i class="material-icons">psychology_alt</i>
                Forgot password
            </button>
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
        height: 30px;
        padding-left:10px;
    }
    button {
        margin-top:20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        transition: var(--transition-time);
    }
    #registerForm button:hover, #registerForm button:active {
        background-color:white;
        color: var(--main-bg-color)
    }
    .switchAuth {
        margin-bottom:10px;
    }
    .errorText {
        color: var(--main-error-color);
    }
    .successText {
        color: var(--main-success-color);
    }

    .registerIcon {
        display:none;
        margin: 0px auto;
    }
    .registerContainer {background-color: var(--main-bg-color);}

    .switchAuth i, #registerForm i {
        margin-right:10px;
        font-size:40px;
    }
    #registerForm button {
        color:white;
        background-color: var(--main-bg-color-darken);
    }
    
    /* Desktop */
    @media (min-width: 1024px) {
        .switchAuth {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        .switchAuth button {
            margin:10px;
        }
        .registerContent {
           margin: 30vh auto;
        }
        #registerForm button {
           margin-top:20px;
           margin-bottom:20px;
        }
    }

    /* Tablet */
    @media (max-width: 1024px) {
        .registerContent {}
        .registerIcon {
            color:white;
            display:block;
        }
        .registerIcon .material-icons {
            font-size: 120px;
        }
        .registerContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100vw;
        }
        #registerForm {
            width: 100%;
        }
        #registerForm input {
            height:40px;
            font-size: 16px;
            padding-left: 20px;
        }
        #registerForm button {
            width:50%;
            height:50px;
            font-size: 16px;
            margin-top: 70px;
            margin: 70px auto 20px auto;
        }
        .switchAuth {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width:100%;
        }
        .switchAuth button {
            width:50%;
            height:50px;
            font-size: 16px;
        }
    }
    /* Phone */
    @media (max-width: 768px) {
        .registerContent {}
        .registerIcon {
            display:block;
        }
    }
</style>