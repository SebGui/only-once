//import { isProxy, toRaw } from 'vue';

// Pinia defineStore
import { defineStore } from 'pinia'

// Types imports
import User from '@/types/User'
import LogType from '@/types/LogType'
import Status from '@/types/Status'

// Config import
import conf from '@/../onceConfig'

// Utils
import idGenerator from '@/composables/utils/idGenerator'

// Cookie related imports
import { VueCookies } from 'vue-cookies';

// User API
import usersApi from '@/composables/api/User'

// Other stores auto load
import useProfileStore from '@/stores/profileStore'

// State type of the authentication store
type State = {
    user: User | null
    errorText: string | null
    successText: string | null
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
        successText: null,
        cookies: undefined
    }),
    getters: {
        // Getters related to user datas
        getStatus():Status {
            return (this.user != undefined) ? this.user.Status : 1
        },
        getProfileID():string {
            return (this.user != undefined) ? this.user.profileID : ""
        }
    },
    actions: {
        async login(login: string, password: string): Promise<boolean> {
            const data: User[] = await usersApi.getUsers()

            // Check credentials
            const user = data.filter((cUser) => {
                if (cUser.login === login &&
                    cUser.password === password) {
                    return true
                }
            })

            // If user exists, set our store object, tokens and update datas
            if (user.length > 0) {
                this.user = user[0]
                this.errorText = null
                this.isLoggedIn = true
                this.cookies?.set('accessToken', idGenerator(conf.accessTokenLenght))
                this.cookies?.set('userId', this.user.userID)
                this.user.lastLoggedIn = new Date().getTime()
                this.user.accessToken = this.cookies?.get('accessToken')
                this.updateUser();

                this.loadProfileDependencies();
                return true
            } else {
                this.setErrorText('The combinaison login/password doesn\'t match')
                return false
            }
        },
        logout(): void {
            // Logout function
            this.cookies?.remove('accessToken')
            this.cookies?.remove('userId')
            this.isLoggedIn = false

        },
        async register(login: string, password: string, email: string): Promise<boolean> {
            // Check if user exists
            let userExists = false
            userExists = await usersApi.getUserByLogin(login).then((res) => {
                if (res.length > 0) {
                    this.setErrorText('This login is not available')
                    return true;
                }
                return false;
            });
            if (userExists === true) {return false}

            // User creation
            const newUser: User = {
                id: idGenerator(conf.userIdLength),
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
                accessToken: ""
            }
            await usersApi.addUser(newUser)
            this.showForm = 'login'
            this.setSuccessText('Account created, please login.')
            return true;
        },
        async setForgotForm(email: string, newPass: string): Promise<string[] | boolean> {
            let userExists
            let userObj: User;

            userExists = await usersApi.getUserByEmail(email).then(async (res) => {
                if (res.length === 0) {
                    this.setErrorText('Entry not found')// Might change to simple "if user is found you will receive an email shortly" for security
                    userExists = false
                    return false;
                } else {
                    userExists = true
                }
                userObj = res[0]

                if (userExists === false || userObj === null) {return false}

                userObj.password = newPass
                userObj.updatedAt = new Date().getTime()
                await usersApi.updateUser(userObj)
                return true
            });

            return userExists
        },
        async checkLogStatus(): Promise<void> {
            if (this.cookies && this.cookies.get('accessToken') === null) {
                this.isLoggedIn = false
              } else {
                this.isLoggedIn = true
                if (this.user === null) {
                    await this.setUser()
                }
                this.loadProfileDependencies();
              }
        },
        // Setters
        async updateUser(): Promise<void> {
            if (this.user) {
                await usersApi.updateUser(this.user)
            }
        },
        async setUser(): Promise<void> {
            await usersApi.getUser(this.cookies?.get('userId'))
            .then( (res) => {
                this.user = res[0]
            })
        },
        setCookieObj(cookies: VueCookies | undefined) {
            this.cookies = cookies
        },
        setShowForm(mode: LogType) : void {
            this.showForm = mode
            this.errorText = null
            this.successText = null
        },
        setErrorText(text: string) {
            this.errorText = text
            this.successText = null
        },
        setSuccessText(text: string) {
            this.errorText = null
            this.successText = text
        },
        checkToken(): boolean {
            return this.user?.accessToken === this.cookies?.get('accessToken')
        },
        loadProfileDependencies(): void {
            // Load syb profile parts on login and check if logged (refresh)
            if (this.user != null) {
                const profileStore = useProfileStore();
                profileStore.setProfileID(this.user.profileID)
            }
        }
    }
})

export default useAuthStore