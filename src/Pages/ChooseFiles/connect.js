import { connect } from 'react-redux'
import { saveAppState } from '../../Data/AppState'
import { resetPrimaryModel } from '../../Data/PrimaryState'
import { setHeaderLinkFilters } from '../../Data/SetHeaderLink'

const mapDispatchToProps = {
    saveAppState,
    setHeaderLinkFilters,
    resetPrimaryModel,
}

export default connect(null, mapDispatchToProps)
