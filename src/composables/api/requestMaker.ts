import useAuthStore from "@/stores/authStore"

// eslint-disable-next-line
const requestMaker = async (uri: string, options?: object) : Promise<any> => {
    const authStore = useAuthStore();
    if (authStore.checkToken() !== true) {
        authStore.logout();
        throw("accessToken mismatch or corrupted, please login again")
        return null
    }
    const res = await fetch(uri, options)
    const data = await res.json()

    return data
}

// eslint-disable-next-line
const prelogRequestMaker = async (uri: string, options?: object) : Promise<any> => {
    const res = await fetch(uri, options)
    const data = await res.json()

    return data
}


export default {requestMaker, prelogRequestMaker}