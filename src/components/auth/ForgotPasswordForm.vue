<template>
    <div class="forgotContainer">
        <div class="forgotIcon">
            <i class="material-icons">psychology_alt</i>
         </div>

        <form @submit.prevent="handleForgotEmail" id="forgotForm" ref="form">
            <input type="email" placeholder="Enter your email..." name="user_email" v-model="email" required autofocus>
            <input type="text" name="user_name" value='Only-Once user' hidden>
            <textarea name="message" hidden v-model="body"></textarea>

            <span v-if="authStore.errorText != null" class="errorText">{{ authStore.errorText }}</span>
            <span v-if="authStore.successText != null" class="successText">{{ authStore.successText }}</span>

            <button>
                <i class="material-icons">psychology_alt</i>
                Submit
            </button>
        </form>

        <div class="switchAuth">
            <button @click="handleSwitch('login')">
                <i class="material-icons">login</i>
                Login
            </button>

            <button @click="handleSwitch('register')">
                <i class="material-icons">app_registration</i>
                Forgot password
            </button>
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
    #forgotForm button:hover, #forgotForm button:active {
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
    .forgotIcon {
        display:none;
        margin: 0px auto;
    }
    .forgotContainer {background-color: var(--main-bg-color);}

    .switchAuth i, #forgotForm i {
        margin-right:10px;
        font-size:40px;
    }
    #forgotForm button {
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
        .forgotContent {
           margin: 30vh auto;
        }
        #forgotForm button {
           margin-top:20px;
           margin-bottom:20px;
        }
    }

    /* Tablet */
    @media (max-width: 1024px) {
        .forgotContent {}
        .forgotIcon {
            color:white;
            display:block;
        }
        .forgotIcon .material-icons {
            font-size: 120px;
        }
        .forgotContainer {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100vw;
        }
        #forgotForm {
            width: 100%;
        }
        #forgotForm input {
            height:40px;
            font-size: 16px;
            padding-left: 20px;
        }
        #forgotForm button {
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
        .forgotContent {}
        .forgotIcon {
            display:block;
        }
    }
</style>