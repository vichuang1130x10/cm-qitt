import { connect } from 'react-redux'
import { saveAppState } from '../../Data/AppState'
import { setHeaderLinkFilters } from '../../Data/SetHeaderLink'

const mapDispatchToProps = {
    saveAppState,
    setHeaderLinkFilters,
}

export default connect(null, mapDispatchToProps)
