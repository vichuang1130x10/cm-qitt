import { connect } from 'react-redux'

import { setLinkFilters } from '../../Data/SetVisiblityFilter'

const mapStateToProps = (state) => ({
    repairData: state.app.rawRepairList,
    dateRange: state.visibilityFilter,
})

const mapDispatchToProps = {
    setLinkFilters,
}

export default connect(mapStateToProps, mapDispatchToProps)
