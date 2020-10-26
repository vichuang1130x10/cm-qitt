import { connect } from 'react-redux'

import { setLinkFilters } from '../../Data/SetVisiblityFilter'

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log(ownProps.filter)
        dispatch(setLinkFilters(ownProps.filter))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)
