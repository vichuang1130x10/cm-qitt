import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    appState: state.app.yieldRate,
    repairData: state.app.parsedErrorList,
})

export default connect(mapStateToProps)
