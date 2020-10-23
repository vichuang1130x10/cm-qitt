import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    repairData: state.app.rawRepairList,
})

export default connect(mapStateToProps)
