import { connect } from "react-redux";
import {
  saveAppState
} from "../../Data/AppState";
 

const mapDispatchToProps = {
    saveAppState,
};

export default connect(
  null,
  mapDispatchToProps
);