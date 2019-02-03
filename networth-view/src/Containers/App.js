import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { saveUserNetworth } from '../Actions/SaveUserNetworth';
import App from '../App/App';

export const mapStateToProps = state => {
    return {
        networth: state.networthReducer
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        saveUserNetworth: networth => {
            dispatch(saveUserNetworth(networth));
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
