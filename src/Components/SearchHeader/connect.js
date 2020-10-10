import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    primaryState: state.primaryState,
})

export default connect(mapStateToProps)
