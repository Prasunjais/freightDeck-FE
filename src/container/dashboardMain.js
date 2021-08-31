import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import DashboardMain from "../component/dashboardMain/dashboardMain";

//Action Creator
import { loggedIn, userProfileData } from "../action/user";

const mapStateToProps = (state) => {
  return {
    profileDetails: state.user.profileDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loggedIn,
      userProfileData,
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardMain)
);
