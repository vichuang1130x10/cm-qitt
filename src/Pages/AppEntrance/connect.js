import { connect } from 'react-redux'
import { saveAppState, resetAppState } from '../../Data/AppState'
import { resetPrimaryModel, setPrimaryModels } from '../../Data/PrimaryState'
import { setHeaderLinkFilters } from '../../Data/SetHeaderLink'
import { setLinkFilters } from '../../Data/SetVisiblityFilter'

const mapDispatchToProps = {
    saveAppState,
    resetAppState,
    setHeaderLinkFilters,
    setPrimaryModels,
    resetPrimaryModel,
    setLinkFilters,
}

export default connect(null, mapDispatchToProps)
