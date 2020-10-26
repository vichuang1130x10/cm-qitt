import { connect } from 'react-redux'
import { saveAppState } from '../../Data/AppState'
import { resetPrimaryModel } from '../../Data/PrimaryState'
import { setHeaderLinkFilters } from '../../Data/SetHeaderLink'
import { setLinkFilters} from '../../Data/SetVisiblityFilter'

const mapDispatchToProps = {
    saveAppState,
    setHeaderLinkFilters,
    resetPrimaryModel,
    setLinkFilters
}

export default connect(null, mapDispatchToProps)
