import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';

class AlertInfo extends Component {
    render() {
        if (this.props.isAlertShow === false) { return null; }
        return (
            <AlertContainer>
                <Alert onDismiss={() => this.props.changeAlertHideStatus()} timeout={2000} type="info">{this.props.titleAlert}</Alert>
            </AlertContainer>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isAlertShow: state.isAlertShow,
        titleAlert: state.titleAlert
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAlertHideStatus: () => {
            dispatch({
                type: "CHANGE_ALERT_HIDE_STAUS"
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo);