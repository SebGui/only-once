import conf from '@/../onceConfig'
import Education from '@/types/Education'

import rm from './requestMaker'

const getUserEducations = async (id: string): Promise<Education[]> => {
    return rm.requestMaker(conf.uris.getUserEducations+id, {});
}

const addUserEducation = async (education: Education): Promise<boolean> => {
    return rm.requestMaker(conf.uris.addUserEducation, {
        method: 'POST',
        body: JSON.stringify(education),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUserEducation = async (education: Education): Promise<boolean> => {
    return rm.requestMaker(conf.uris.updateUserEducation+education.id, {
        method: 'PATCH',
        body: JSON.stringify(education),
        headers: {'Content-Type': 'application/json'}
    });
}
const deleteUserEducation = async (id: string): Promise<boolean> => {
    return rm.requestMaker(conf.uris.deleteUserEducation+id, {
        method: 'DELETE'
    });
}

export default {getUserEducations, addUserEducation, updateUserEducation, deleteUserEducation}