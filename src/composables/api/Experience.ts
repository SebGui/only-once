import conf from '@/../onceConfig'
import Experience from '@/types/Experience'

import rm from './requestMaker'
import myLog from '../utils/myLog'

const getAllUserExperiences = async (ids: string[]): Promise<Experience[]> => {
    return rm.requestMaker(conf.uris.getUserExperiences, {});
}

const getUserExperience = async (id: string): Promise<Experience> => {
    return rm.requestMaker(conf.uris.getUserExperience+id, {});
}

const addUserExperience = async (experience: Experience): Promise<boolean> => {
    return rm.requestMaker(conf.uris.addUserExperience, {
        method: 'POST',
        body: JSON.stringify(experience),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUserExperience = async (experience: Experience): Promise<boolean> => {
    return rm.requestMaker(conf.uris.updateUserExperience+experience.id, {
        method: 'PATCH',
        body: JSON.stringify(experience),
        headers: {'Content-Type': 'application/json'}
    });
}
const deleteUserExperience = async (id: string): Promise<boolean> => {
    return rm.requestMaker(conf.uris.deleteUserExperience+id, {
        method: 'DELETE'
    });
}

export default {getAllUserExperiences, getUserExperience, addUserExperience, updateUserExperience, deleteUserExperience}