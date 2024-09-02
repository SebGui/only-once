import useAuthStore from "@/stores/authStore"

// eslint-disable-next-line
const requestMaker = async (uri: string, options?: object) : Promise<any> => {
    const authStore = useAuthStore();
    if (authStore.checkToken() !== true) {
        authStore.logout();
        throw("accessToken mismatch or corrupted, please login again")
    }

    try {
        const res = await fetch(uri, options)
        return await res.json()
    } catch (e) {
        console.log(e);
    }
}

// eslint-disable-next-line
const prelogRequestMaker = async (uri: string, options?: object) : Promise<any> => {
    try {
        const res = await fetch(uri, options)
        return await res.json()
    } catch (e) {
        console.log(e);
    }
}


export default {requestMaker, prelogRequestMaker}