import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { saveUserDetail } from '../Actions/SaveUserDetail';
import App from '../App/App';

export const mapStateToProps = state => {
    return {
        email: state.saveUserDetailReducer
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        saveUserDetail: email => {
            dispatch(saveUserDetail(email));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
