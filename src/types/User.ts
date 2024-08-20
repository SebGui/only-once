import Status from '@/types/Status'

interface User {
    id: String,
    userID: string,
    login: string,
    password: string,
    email: string,
    googleID: string,
    lastLoggedIn: number,
    createdAt: number,
    updatedAt: number,
    Status: Status,
    profileID: string,
    accessToken: string
}

export default User

/* String ID (primaryKey)
String Login (salted + encrypted)
String Password (salted + encrypted)
String Email (for password recovery)
String Opt googleID (maybe more after)
Int lastLoggedIn (timestamp)
Int createdAt (timestamp)
Int updatedAt (timestamp)
Int Status (off/idle/active) search frequency
String profileID (foreignKey) */