import React, { Component } from 'react';
import { connect } from 'react-redux';

class Template extends Component {
    onClickDeleteItem = () => {
        console.log("21331");
        this.props.doDeleteItem(this.props.id);
    }
    onClickEditItem = () => {
        this.props.changeEditStatus();
        this.props.getDataEdit(this.props.data);
        this.props.doEditItem();
    }
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.title}</td>
                <td>{this.props.content}</td>
                <td>
                    <button type="button" onClick={() => this.onClickEditItem()} className="btn btn-info mr-1">Edit</button>
                    <button type="button" onClick={() => this.onClickDeleteItem()} className="btn btn-danger">Delete</button>
                </td>
            </tr >
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
        changeEditStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_STAUS"
            })
        },
        getDataEdit: (dataEdit) => {
            dispatch({
                type: "GET_DATA_EDIT", dataEdit
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Template);
