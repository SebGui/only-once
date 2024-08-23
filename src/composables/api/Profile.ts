import conf from '@/../onceConfig'
import Profile from '@/types/Profile'

import rm from './requestMaker'

const getUserProfile = async (id: string): Promise<Profile> => {
    return rm.requestMaker(conf.uris.getUserProfile+id, {});
}

const updateUserProfile = async (profile: Profile): Promise<boolean> => {
    return rm.requestMaker(conf.uris.updateUserProfile+profile.id, {
        method: 'PATCH',
        body: JSON.stringify(profile),
        headers: {'Content-Type': 'application/json'}
    });
}

export default {getUserProfile, updateUserProfile}