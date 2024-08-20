import conf from '@/../onceConfig'
import Profile from '@/types/Profile'

import rm from './requestMaker'

const getUserProfile = async (id: string): Promise<Profile> => {
    return rm.requestMaker(conf.uris.getUserProfile+id, {});
}

export default {getUserProfile}