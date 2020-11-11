export const VisibilityFilters = {
    SHOW_SEVEM_DAYS: 'SHOW_SEVEM_DAYS',
    SHOW_FOURTEEN_DAYS: 'SHOW_FOURTEEN_DAYS',
    SHOW_ALL: 'SHOW_ALL',
    SHOW_CUSTOMIZE: 'SHOW_CUSTOMIZE',
}

const initialState = VisibilityFilters.SHOW_SEVEM_DAYS

const createActionWithName = (name) => `app/tasks/${name}`

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_VISIBILITY_FILTERS:
            return action.filter
        default:
            return state
    }
}

export const SET_VISIBILITY_FILTERS = createActionWithName(
    'SET_VISIBILITY_FILTERS'
)

export const setLinkFilters = (filter) => ({
    type: SET_VISIBILITY_FILTERS,
    filter,
})
