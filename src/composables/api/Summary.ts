import conf from '@/../onceConfig'
import Summary from '@/types/Summary'

import rm from './requestMaker'

const getUserSummary = async (id: string): Promise<Summary> => {
    return rm.requestMaker(conf.uris.getUserSummary+id, {});
}

const addUserSummary = async (summary: Summary): Promise<boolean> => {
    return rm.requestMaker(conf.uris.addUserSummary, {
        method: 'POST',
        body: JSON.stringify(summary),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUserSummary = async (summary: Summary): Promise<boolean> => {
    return rm.requestMaker(conf.uris.updateUserSummary+summary.id, {
        method: 'PATCH',
        body: JSON.stringify(summary),
        headers: {'Content-Type': 'application/json'}
    });
}
const deleteUserSummary = async (id: string): Promise<boolean> => {
    return rm.requestMaker(conf.uris.deleteUserSummary+id, {
        method: 'DELETE'
    });
}

export default {getUserSummary, addUserSummary, updateUserSummary, deleteUserSummary}