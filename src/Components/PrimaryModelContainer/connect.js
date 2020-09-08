import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    appData: state.app.yieldRate,
})

export default connect(mapStateToProps)
