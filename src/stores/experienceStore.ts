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
            // Update DB reference
            const isSuccess:boolean = await experienceApi.addUserExperience(experience)

            // Update local store reference
            this.experiences.push(experience)
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
            await experienceApi.getAllUserExperiences()
                    .then(async (res) => {
                        // For some reason multiple id search doesn't work on json-server
                        // So we have to get all then filter the result
                        // [Other way] : could bind userID to/in experience to retieve related experiences

                        // Set our experience store obj
                        this.experiences = res.filter((item) => {
                            for (let i = 0; i < this.experiencesIDs.length; i++) {
                                if (item.id === this.experiencesIDs[i]) {
                                    return true
                                }
                            }
                        })
                    })
        },
        async setExperience(experienceId: string): Promise<void> {
            this.experiencesIDs.push(experienceId)//Update profile id's
        },
        async setExperiences(experienceIDs: string[]): Promise<void> {
            this.experiencesIDs = experienceIDs//Update profile id's
        },
        async deleteExperience(id:string): Promise<void>{
            // Update DB reference
            await experienceApi.deleteUserExperience(id)

            // Update local store reference
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
                // Update DB reference
                await experienceApi.updateUserExperience(experience);

                // Update local reference
                for (let i = 0; i < this.experiences.length;i++) {
                    if (this.experiences[i].id === experience.id) {
                        this.experiences[i] = experience
                        return
                    }
                }
            }
        },

        getExperienceWithId(id: string): Experience {
            return this.experiences.filter((item) => {
                if (item.id === id)
                    return true
                return false
            })[0]
        }
    }
})

export default useExperienceStore