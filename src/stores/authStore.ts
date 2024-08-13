import { defineStore } from 'pinia'
import User from '@/types/User'
import LogType from '@/types/LogType'

type State = {
    user: User | null
    errorText: string
    isLoggedIn: boolean
    showForm: LogType

}

const useAuthStore = defineStore('authStore', {
    state : (): State => ({
        user: null,
        errorText: "",
        isLoggedIn: false,
        showForm: 'login'
    }),
    getters: {
        // Getters related to user datas
    },
    actions: {
        login(): boolean {
            if (this.isLoggedIn == true) { // Login success
                return true
            } else {
                // Set error
                return false
            }
        },
        logout(): void {
            console.log("Logout function");
        },
        setShowForm(mode: LogType) : void {
            this.showForm = mode;
        }
    }
})

export default useAuthStore