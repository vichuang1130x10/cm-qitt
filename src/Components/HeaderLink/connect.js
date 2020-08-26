import { connect } from 'react-redux'
import { setHeaderLinkFilters } from '../../Data/SetHeaderLink'

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.filter,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log(ownProps.filter)
        dispatch(setHeaderLinkFilters(ownProps.filter))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)
