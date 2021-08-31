import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import ContractList from "../component/contract/contractList";

//Action Creator
import { contractList } from "../action/contracts";

const mapStateToProps = (state) => {
  return {
    contractList: state.contracts.contractList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      contractList
    },
    dispatch
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContractList)
);
