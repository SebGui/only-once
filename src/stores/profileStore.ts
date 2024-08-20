import {defineStore} from 'pinia'

import Profile from '@/types/Profile'

import profilesApi from '@/composables/api/Profile'

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
        setProfileID(profileID: string) : void {
            this.profileID = profileID
            this.getProfileObj()
        }
    }
})

export default useProfileStore