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

// Model
// AOI-A1: {Pass: 13146, Fail: 74, Total: 13220, data: Array(31), mo: Array(39), …}
// AOI-A2: {Pass: 13086, Fail: 134, Total: 13220, data: Array(41), mo: Array(39), …}
// DIP-VI: {Pass: 13203, Fail: 8, Total: 13211, data: Array(116), mo: Array(42), …}
// First & Function TEST: {Pass: 13514, Fail: 322, Total: 13836, data: Array(146), mo: Array(52), …}
// RowData: (3493) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, …]
// inTheSevenDaysData: (4) [{…}, {…}, {…}, {…}]
// isSelect: false
// model: "MBD-X11DPT-PS"
// productType: "MB"
// sevenDayFty: 83.33
// sevenDayPass: 20
// sevenDayTotal: 24
// station0FTY: 99.4
// station1FTY: 99
// station2FTY: 99.9
// station3FTY: 97.7
