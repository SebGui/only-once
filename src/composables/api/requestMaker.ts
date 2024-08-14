// eslint-disable-next-line
const requestMaker = async (uri: string, options: object) : Promise<any> => {
    const res = await fetch(uri, options)
    const data = await res.json()

    return data
}

export default requestMaker