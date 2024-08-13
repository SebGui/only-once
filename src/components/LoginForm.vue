<template>
    <div>
        <form @submit.prevent="handleLogin">
            <input type="text" placeholder="Type your login..." autofocus>
            <input type="password" placeholder="Type your password...">

            <button>Submit</button>
        </form>

        <div class="switchAuth">
            <span @click="handleSwitch('register')">Register</span> /
            <span @click="handleSwitch('forgot')">Forgot password</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useAuthStore from '@/stores/authStore'
    import LogType from '@/types/LogType'

    const authStore = useAuthStore()
    const handleSwitch = (mode: LogType): void => {
        authStore.setShowForm(mode)
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
</style>