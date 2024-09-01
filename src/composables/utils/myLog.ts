import conf from '@/../onceConfig'

// Custom console log synced on devMode from OnceConfig file
const myLog = (obj: any): void => {
    if (conf.devMode === true) {
        console.log(obj);
    }
}

export default myLog