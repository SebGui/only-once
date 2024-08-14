import conf from '@/../onceConfig'
import User from '@/types/User'

import requestMaker from './requestMaker'

const getUsers = async (): Promise<User[]> => {
    return requestMaker(conf.uris.getUsers, {});
}

const addUser = async (user: User): Promise<boolean> => {
    return requestMaker(conf.uris.getUsers, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUser = async (user: User): Promise<boolean> => {
    return requestMaker(conf.uris.getUsers, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

export default {getUsers, addUser, updateUser}


