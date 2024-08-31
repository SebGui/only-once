import Experience from '@/types/Experience'
import experienceApi from '@/composables/api/Experience'
import {defineStore} from 'pinia'

type State = {
    experiences : Experience[]
    experiencesIDs : string[]
}

const useExperienceStore = defineStore('experienceStore', {
    state : (): State => ({
        experiences : [],
        experiencesIDs: []
    }),
    getters : {

    },
    actions: {
        async addExperience(experience: Experience): Promise<boolean> {
            const isSuccess:boolean = await experienceApi.addUserExperience(experience)
            this.experiencesIDs.push(experience.id)//Update profile id's
            return isSuccess
        },
        async getExperience(id:string): Promise<void> {
            await experienceApi.getUserExperience(id)
                    .then(async (res) => {
                        this.experiences.push(res)
                        this.experiencesIDs.push(res.id)//Update profile id's
                    })
        },
        async getAllExperiences(): Promise<void> {
            await experienceApi.getAllUserExperiences(this.experiencesIDs)
                    .then(async (res) => {
                        // For some reason multiple id search doesn't work on json-server
                        // So we have to get all then filter the result

                        // Set our experience store obj
                        this.experiences = res.filter((item) => {
                            for (let i = 0; i < this.experiencesIDs.length; i++) {
                                if (item.id === this.experiencesIDs[i]) {
                                    return true
                                }
                            }
                        })

                        // Set the list of our experience IDs
                        for (let i = 0;i < this.experiences.length;i++) {
                            this.experiencesIDs.push(res[i].id)//Update profile id's
                        }
                    })
        },
        async setExperience(experienceId: string): Promise<void> {
            this.experiencesIDs.push(experienceId)//Update profile id's
        },
        async setExperiences(experienceIDs: string[]): Promise<void> {
            this.experiencesIDs = experienceIDs//Update profile id's
        },
        async deleteExperience(id:string): Promise<void>{
            await experienceApi.deleteUserExperience(id)

            const index = this.experiencesIDs.indexOf(id);
            if (index > -1) {
                this.experiencesIDs.splice(index, 1);//Update profile id's
            }
            this.experiences = this.experiences.filter((item) => {
                if (id === item.id) {
                    return false
                }
                return true
            })
        },
        async updateExperience(experience: Experience): Promise<void>{
            if (experience.id != null) {
                await experienceApi.updateUserExperience(experience);
            }
        }
    }
})

export default useExperienceStore