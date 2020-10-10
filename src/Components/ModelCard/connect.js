import { connect } from 'react-redux'
import { togglePrimaryModel } from '../../Data/PrimaryState'

const mapStateToProps = (state) => ({
    primaryState: state.primaryState,
})

const mapDispatchToProps = {
    togglePrimaryModel,
}

export default connect(mapStateToProps, mapDispatchToProps)
