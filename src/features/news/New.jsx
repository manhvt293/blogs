import React, { Component } from 'react';
import callApi from './../../api/axiosClient';
import FormAdd from './FormAdd';
import Template from './Template';
import { connect } from 'react-redux';
import FormEdit from './FormEdit';

class New extends Component {
    constructor(props) {
        super(props);
        this.isComponentDidMount = false;
        this.state = ({
            dataNews: []
        })
    }

    allNews = () => {
        this.isComponentDidMount = true;
        callApi("news", "get", null)
            .then(res => {
                if (this.isComponentDidMount) {
                    this.setState({
                        dataNews: res.data,
                    });
                }
            })
    }

    componentDidMount() {
        this.isComponentDidMount = true;
        this.allNews();
    }

    showDataNew = () => {
        return this.state.dataNews.map((value, key) => {
            return (
                <Template
                    key={key}
                    id={value.id_news}
                    title={value.title}
                    content={value.content}
                    data={value}
                />
            )
        })
    }
    showForm = () => {
        if (this.props.isCreate) {
            return <FormAdd />
        }

        if (this.props.isEdit) {
            return <FormEdit />
        }
    }
    render() {
        //this.allNews()
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="page-header">
                            <h3>
                                Manager New
                                <button type="button" onClick={() => this.props.changeCreateStatus()} className="btn btn-success ml-2">Add</button>
                            </h3>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Content</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.showDataNew()}

                            </tbody>
                        </table>
                    </div>
                    {this.showForm()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isCreate: state.isCreate,
        isEdit: state.FormEdit
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCreateStatus: () => {
            dispatch({
                type: "CHANGE_CREATE_STAUS"
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);