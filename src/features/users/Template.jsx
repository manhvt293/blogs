import React, { Component } from 'react';

class Template extends Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.id}</th>
                <td>{this.props.username}</td>
                <td>{this.props.email}</td>
                <td>{this.props.name}</td>
                <td>
                    <button type="button" onClick={() => this.props.editItem()} className="btn btn-primary mr-1">Edit</button>
                    <button type="button " onClick={() => this.props.handleDeleteItem()} className="d-none btn btn-danger mr-1">Delete</button>
                    <button type="button" onClick={() => this.props.handleAtiveItem()} className="btn btn-danger">{this.props.textActive}</button>
                </td>
            </tr>
        );
    }
}

export default Template;