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

        default:
            return state
    }
}
