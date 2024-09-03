import {defineStore} from 'pinia'

import Profile from '@/types/Profile'

import profilesApi from '@/composables/api/Profile'

import useSummaryStore from './summaryStore'
import useExperienceStore from './experienceStore'

type State = {
    profile: Profile | null
    profileID: string
}
// From authStore initialise profile id?
// json-server multi id search : /category?&paramName=X1&paramName=X2&paramName=X3&paramName=X4
// http://localhost:3000/users?&userID=tub4Xj&userID=6ltKMO (Not working...)

const useProfileStore = defineStore('profileStore', {
    state: (): State => ({
        profile: null,
        profileID : ''
    }),
    getters: {

    },
    actions: {
        async getProfileObj() {
            this.profile = await profilesApi.getUserProfile(this.profileID);
        },
        async updateProfile(): Promise<void> {
            if (this.profile != null) {
                await profilesApi.updateUserProfile(this.profile);
            }
        },
        async setProfileID(profileID: string) : Promise<void> {
            this.profileID = profileID
            await this.getProfileObj()
            if (this.profile !== null) {
                this.setSummaryID(this.profile.summaryID)
                this.setExperienceID(this.profile.experienceIDs)
                // Set foreign keys objs to load related datas: skills, languages, educations ...
            }
        },

        /* Experience related */
        addExperienceID(experienceID: string): void {
            if (this.profile !== null) {
                // Update profile obj for our store
                this.profile.experienceIDs.push(experienceID)

                // Update profile obj in DB
                this.updateProfile()
            }
        },
        async setExperienceID(experienceIDs: string[]): Promise<void> {
            if (this.profile !== null) {
                //this.profile.experienceIDs = experienceIDs

                // Set experiencesIDs in our experienceStore
                const experienceStore = useExperienceStore()
                experienceStore.setExperiences(experienceIDs)

                // Get experiences
                await experienceStore.getAllExperiences()
            }
        },
        async deleteExperienceID(id: string): Promise<void> {
            if (this.profile !== null) {
                // remove experienceId from array
                const index = this.profile.experienceIDs.indexOf(id);
                if (index > -1) {
                    this.profile.experienceIDs.splice(index, 1);//Update profile id's
                }

                // Update profile on DB
                this.updateProfile()
            }
        },

        /* Summary related */
        async setSummaryID(summaryID: string): Promise<void> {
            if (this.profile !== null) {
                this.profile.summaryID = summaryID

                const summaryStore = useSummaryStore(); 
                summaryStore.setSummary(summaryID)
                await summaryStore.getSummary()
            }
        },
        async deleteSummaryID(): Promise<void> {
            if (this.profile !== null) {
                this.profile.summaryID = ''
                this.updateProfile()
            }
        }
    }
})

export default useProfileStore