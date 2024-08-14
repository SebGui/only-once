import { defineStore } from 'pinia'

// Types imports
import User from '@/types/User'
import LogType from '@/types/LogType'

// Config import
import conf from '@/../onceConfig'
import idGenerator from '@/composables/utils/idGenerator'

// Cookie related imports
import { VueCookies } from 'vue-cookies';

import usersApi from '@/composables/api/User'

type State = {
    user: User | null
    errorText: string | null
    isLoggedIn: boolean
    showForm: LogType
    cookies: VueCookies | undefined

}

const useAuthStore = defineStore('authStore', {
    state : (): State => ({
        user: null,
        errorText: null,
        isLoggedIn: false,
        showForm: 'login',
        cookies: undefined
    }),
    getters: {
        // Getters related to user datas
        test() {
            console.log("test");
        }
    },
    actions: {
        async login(login: string, password: string): Promise<boolean> {
            /*const res = await fetch(conf.uris.getUsers)
            const data: User[] = await res.json()*/
            const data: User[] = await usersApi.getUsers()

            const user = data.filter((cUser) => {
                if (cUser.login === login &&
                    cUser.password === password) {
                    return true
                }
            })

            if (user.length > 0) {
                this.user = user[0]
                this.errorText = null
                this.isLoggedIn = true;
                this.cookies?.set('accessToken', idGenerator(conf.accessTokenLenght))
                this.cookies?.set('userId', this.user.userID)
                return true
            } else {
                this.errorText = 'The combinaison login/password doesn\'t match'
                return false
            }
        },
        logout(): void {
            //console.log("Logout function");
            this.cookies?.remove('accessToken')
            this.cookies?.remove('userId')
            this.isLoggedIn = false;

        },
        async register(login: string, password: string, email: string): Promise<void> {
            console.log('REgister function');
            // check if user exists
            const newUser: User = {
                userID: idGenerator(conf.userIdLength),
                login: login,
                password: password,
                email: email,
                googleID: '',
                lastLoggedIn: 0,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                Status: 1,
                profileID: idGenerator(conf.profileIdLength),
            }
            const data = await usersApi.addUser(newUser)
            this.showForm = 'login';
            console.log(data);
        },
        checkLogStatus(): void {
            if (this.cookies && this.cookies.get('accessToken') === null) {
                this.isLoggedIn = false;
              } else {
                this.isLoggedIn = true;
              }
        },
        setCookieObj(cookies: VueCookies | undefined) {
            this.cookies = cookies
        },
        setShowForm(mode: LogType) : void {
            this.showForm = mode;
        }
    }
})

export default useAuthStore