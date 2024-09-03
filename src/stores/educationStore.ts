import useAuthStore from './authStore'
import educationApi from '@/composables/api/Education'
import Education from '@/types/Education'
import {defineStore} from 'pinia'

type State = {
    educations: Education[]
    isLoading: boolean
}

const useEducationStore = defineStore('educationStore', {
    state: (): State => ({
        educations: [],
        isLoading: true
    }),
    getters: {},
    actions: {
        // Get Related educations
        async getEducation(): Promise<void> {
            const authStore = useAuthStore()

            if (authStore.user && authStore.user.userID) {
                await educationApi.getUserEducations(authStore.user.userID)
                    .then(async (res) => {
                        this.educations = res;
                        this.isLoading = false
                    })
            }
        },
        // Add Education
        async addEducation(education: Education): Promise<boolean> {
            // Update DB reference
            const isSuccess:boolean = await educationApi.addUserEducation(education).then((): boolean => {
                // Update local store reference
                this.educations.push(education)
                return true
            })

            return isSuccess
        },

        // Update Education
        async updateEducation(education: Education): Promise<void>{
            if (education.id != null) {
                // Update DB reference
                await educationApi.updateUserEducation(education).then(() => {
                    // Update local reference
                    for (let i = 0; i < this.educations.length;i++) {
                        if (this.educations[i].id === education.id) {
                            this.educations[i] = education
                            return
                        }
                    }
                })
            }
        },

        // Delete education
        async deleteEducation(id:string): Promise<void>{
            // Update DB reference
            await educationApi.deleteUserEducation(id).then(() => {
                // Then update our local reference
                this.educations = this.educations.filter((item) => {
                    if (id === item.id) {
                        return false
                    }
                    return true
                })
            })

        },

        // Get single education
        getEducationWithId(id:string):Education {
            return this.educations.filter((item) => {
                if (id === item.id)
                    return true
            })[0]
        }
    }
})

export default useEducationStore