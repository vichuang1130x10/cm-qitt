const createActionWithName = (name) => `app/tasks/${name}`

export const SAVE_APP_STATE = createActionWithName('SAVE_APP_STATE')
export const saveAppState = (appState) => {
    return {
        type: SAVE_APP_STATE,
        appState,
    }
}

export default function reducer(state = {}, action = {}) {
    switch (action.type) {
        case SAVE_APP_STATE:
            return action.appState
        //Object
        // app:
        // parsedErrorList: {RepairList: Array(13904)}
        // yieldRate:
        // BPNData: {04_AOI_B: {…}, 09_AOI_T: {…}, 24_DIP_VI: {…}, 24_DIP_VI_T: {…}, 34_FT_1: {…}}
        // MBData: {04_AOI_B: {…}, 09_AOI_T: {…}, 24_DIP_VI: {…}, 24_DIP_VI_T: {…}, 34_FT_1: {…}}
        // OtherData: {04_AOI_B: {…}, 09_AOI_T: {…}, 24_DIP_VI: {…}, 24_DIP_VI_T: {…}, 34_FT_1: {…}}
        // endDate: Sun Jul 05 2020 00:00:00 GMT+0800 (Taipei Standard Time) {}
        // models: (145) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
        // piesData: {BPNFCTTotal: 157631, MBFCTTotal: 74533, OtherFCTTotal: 38150}
        // startDate: Wed Jan 01 2020 00:00:00 GMT+0800 (Taipei Standard Time) {}
        // vendor: "CPW"
        default:
            return state
    }
}
