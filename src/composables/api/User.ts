import conf from '@/../onceConfig'
import User from '@/types/User'

import requestMaker from './requestMaker'

const getUsers = async (): Promise<User[]> => {
    return requestMaker(conf.uris.getUsers, {});
}

const getUser = async (id:string): Promise<User[]> => {
    return requestMaker(conf.uris.getUser+id, {});
}

const addUser = async (user: User): Promise<boolean> => {
    return requestMaker(conf.uris.getUsers, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

const updateUser = async (user: User): Promise<boolean> => {
    return requestMaker(conf.uris.updateUsers+user.id, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });
}

const getUserByLogin = async (login: string): Promise<User[]> => {
    console.log(requestMaker(conf.uris.getUserByName + login));
    return requestMaker(conf.uris.getUserByName + login);
}

const getUserByEmail = async (email: string): Promise<User[]> => {
    //console.log(requestMaker(conf.uris.getUserByName + email));
    return requestMaker(conf.uris.getUserByEmail + email);
}

export default {getUsers, getUser, addUser, updateUser, getUserByLogin, getUserByEmail}


