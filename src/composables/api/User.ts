import conf from '@/../onceConfig'
import User from '@/types/User'

import rm from './requestMaker'

const getUsers = async (): Promise<User[]> => {
    return rm.prelogRequestMaker(conf.uris.getUsers, {});
}

const getUser = async (id:string): Promise<User[]> => {
    return rm.prelogRequestMaker(conf.uris.getUser+id, {});
}

const addUser = async (user: User): Promise<boolean> => {
    return rm.prelogRequestMaker(conf.uris.getUsers, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUser = async (user: User): Promise<boolean> => {
    return rm.prelogRequestMaker(conf.uris.updateUsers+user.id, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

const getUserByLogin = async (login: string): Promise<User[]> => {
    return rm.prelogRequestMaker(conf.uris.getUserByName + login);
}

const getUserByEmail = async (email: string): Promise<User[]> => {
    return rm.prelogRequestMaker(conf.uris.getUserByEmail + email);
}

export default {getUsers, getUser, addUser, updateUser, getUserByLogin, getUserByEmail}


