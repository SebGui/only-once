<template>
    <div class="loginContainer">

        <!-- Mobile & tab icon -->
         <div class="loginIcon">
            <i class="material-icons">input</i>
         </div>

        <form @submit.prevent="handleLogin" id="loginForm">
            <input type="text" placeholder="Enter your login..." v-model="login" required autofocus>
            <input type="password" placeholder="Enter your password..." v-model="password" required>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

            <button>
                <i class="material-icons">login</i>
                Log in
            </button>
        </form>

        <div class="switchAuth">
            <button @click="handleSwitch('register')">
                <i class="material-icons">app_registration</i>
                Register
            </button>

            <button @click="handleSwitch('forgot')">
                <i class="material-icons">psychology_alt</i>
                Forgot password
            </button>
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
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
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

    .loginIcon {
        display:none;
        margin: 0px auto;
    }
    .loginContainer {background-color: var(--main-bg-color);}

    .switchAuth i, #loginForm i {
        margin-right:10px;
        font-size:40px;
    }
    #loginForm button {
        color:white;
        background-color: var(--main-bg-color-darken);
    }

    /* Tablet */
    @media (max-width: 1024px) {
        .loginContent {}
        .loginIcon {
            color:white;
            display:block;
        }
        .loginIcon .material-icons {
            font-size: 120px;
        }
        .loginContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        #loginForm {
            width: 100%;
        }
        #loginForm input {
            height:40px;
            font-size: 16px;
            padding: 5px;
        }
        #loginForm button {
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
        .loginContent {}
        .loginIcon {
            display:block;
        }
    }
</style>