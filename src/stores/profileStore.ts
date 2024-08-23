import {defineStore} from 'pinia'

import Profile from '@/types/Profile'

import profilesApi from '@/composables/api/Profile'

import useSummaryStore from './summaryStore'

type State = {
    profile: Profile | null
    profileID: string
}
// From authStore initialise profile id?
// json-server multi id search : /category?&paramName=X1&paramName=X2&paramName=X3&paramName=X4
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
            console.log('SetProfileID : ');
            this.profileID = profileID
            await this.getProfileObj()
            if (this.profile !== null) {
                this.setSummaryID(this.profile.summaryID)
            }
        },
        async setSummaryID(summaryID: string): Promise<void> {
            console.log('Set summary id');
            console.log(this.profile);
            if (this.profile != null) {
                this.profile.summaryID = summaryID

                const summaryStore = useSummaryStore(); 
                summaryStore.setSummary(summaryID)
                await summaryStore.getSummary()
                console.log(summaryStore.summary);
                //this.updateProfile()
            }
        },
        async deleteSummaryID(): Promise<void> {
            if (this.profile != null) {
                this.profile.summaryID = ''
                this.updateProfile()
            }
        }
    }
})

export default useProfileStore