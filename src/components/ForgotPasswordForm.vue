<template>
    <div>
        <form @submit.prevent="handleForgotEmail" id="forgotForm" ref="form">
            <input type="email" placeholder="Enter your email..." name="user_email" v-model="email" required autofocus>
            <input type="text" name="user_name" value='Only-Once user' hidden>
            <textarea name="message" hidden v-model="body"></textarea>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

            <button>Submit</button>
        </form>

        <div class="switchAuth">
            <span @click="handleSwitch('login')">Login</span> /
            <span @click="handleSwitch('register')">Register</span>
        </div>
    </div>
</template>

<script setup lang="ts">
  // Email sender
  import emailjs from '@emailjs/browser'

  // Core Methods
  import { ref } from 'vue'

  // Store
  import useAuthStore from '@/stores/authStore'

  // Types
  import LogType from '@/types/LogType'

  // Utils
  import { Md5 } from 'ts-md5';
  import idGenerator from '@/composables/utils/idGenerator';

  // Configs
  import conf from '@/../onceConfig'
  import keys from '@/../keys'

  const authStore = useAuthStore();
  const email = ref<string>()
  const body = ref<string>()
  const form = ref<string>('')
  let newPass: string;

  // Handling form swap based on LogTypes
  const handleSwitch = (mode: LogType): void => {
      authStore.setShowForm(mode)
  }

  const handleForgotEmail = async (): Promise<void> => {
    // Check email value
    if (email.value != undefined) {

        // Generate temporary password and execute flow
        // [Better way] : send a secure link to email in which user is invited to set a new pass
        newPass = idGenerator(12);

        // Set email body
        body.value = conf.emailTemplate.replace('$password', newPass) 
        await authStore.setForgotForm(email.value, Md5.hashStr(conf.salt + newPass)).then((res) => {
            if (res === true) {// If user email is found
                // SendEmail
                emailjs
                    .sendForm(keys.emailjs.service, keys.emailjs.template, form.value, {
                      publicKey: keys.emailjs.key,
                    })
                    .then(() => {
                        authStore.setSuccessText('Email was sent successfully');
                    }, (error) => {
                        authStore.setErrorText('Error : ' + error.text);
                    },
                );
                newPass = ''
            }
        })
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