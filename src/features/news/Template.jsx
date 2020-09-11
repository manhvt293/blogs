import React, { Component } from 'react';
import { connect } from 'react-redux';

class Template extends Component {
    handleDeleteItem = () => {
        this.props.doDeleteItem(this.props.id);
        this.props.changeAlertShowStatus("Delete success !");
    }
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.title}</td>
                <td>{this.props.content}</td>
                <td>
                    <button type="button" className="btn btn-info mr-1">Edit</button>
                    <button type="button" onClick={() => this.handleDeleteItem()} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doDeleteItem: (id) => {
            dispatch({
                type: "DELETE_ITEM",
                id
            })
        },
        changeAlertShowStatus: (titleAlert) => {
            dispatch({
                type: "CHANGE_ALERT_SHOW_STAUS", titleAlert
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Template);
