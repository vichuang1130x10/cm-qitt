export const VisibilityFilters = {
    SHOW_SEVEM_DAYS: 'SHOW_SEVEM_DAYS',
    SHOW_FOURTEEN_DAYS: 'SHOW_FOURTEEN_DAYS',
    SHOW_ALL: 'SHOW_ALL',
}

const initialState = VisibilityFilters.SHOW_SEVEM_DAYS

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
