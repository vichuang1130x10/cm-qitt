export const SetFilters = {
    SELECT_DASHBOARD: 'SELECT_DASHBOARD',
    SELECT_MODELS: 'SELECT_MODELS',
    SELECT_REPAIRS: 'SELECT_REPAIRS',
}

const initialState = SetFilters.SELECT_DASHBOARD

const createActionWithName = (name) => `app/tasks/${name}`

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_FILTERS:
            return action.filter
        default:
            return state
    }
}

export const SET_FILTERS = createActionWithName('SET_FILTERS')

export const setHeaderLinkFilters = (filter) => ({
    type: SET_FILTERS,
    filter,
})
