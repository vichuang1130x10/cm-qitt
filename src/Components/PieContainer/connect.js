import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    pieData: state.app.yieldRate.piesData,
})

export default connect(mapStateToProps)
