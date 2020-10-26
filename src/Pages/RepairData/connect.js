import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    repairData: state.app.rawRepairList,
    dateRange: state.visibilityFilter,
})

export default connect(mapStateToProps)
