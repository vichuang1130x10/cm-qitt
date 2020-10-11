import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    appData: state.app.yieldRate,
    primaryState: state.primaryState,
})

export default connect(mapStateToProps)
