import { connect } from 'react-redux'

const mapStateToProps = state => ({
    appState: state.app.yieldRate,
})

export default connect(mapStateToProps)
