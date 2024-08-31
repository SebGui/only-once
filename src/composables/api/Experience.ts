import conf from '@/../onceConfig'
import Experience from '@/types/Experience'

import rm from './requestMaker'

const getAllUserExperiences = async (ids: string[]): Promise<Experience[]> => {
    if (conf.devMode === true) {console.log(`getAllUserExperiences ${ids}`);}
    /*let experiences: Promise<Experience[]> = rm.requestMaker(conf.uris.getUserExperiences, {});
    experiences = experiences.filter((item) => {
        for (let i = 0; i < ids.length; i++) {
            if (item.id === ids[i]) {
                return true
            }
        }
    });*/
    // Add ids
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

/*const formIDs = (ids: string[]):string => {
    let idString:string = '';
    for (let i = 0; i< ids.length;i++ ) {
        idString += ''
    }
}*/

export default {getAllUserExperiences, getUserExperience, addUserExperience, updateUserExperience, deleteUserExperience}