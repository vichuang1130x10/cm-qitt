import { connect } from "react-redux";
import {
  saveAppState
} from "../../data/appState";
 

const mapDispatchToProps = {
    saveAppState,
};

export default connect(
  null,
  mapDispatchToProps
);