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
            });
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
                    doDeleteItem={(id) => this.handleDeleteItem(id)}
                    doEditItem={(dataEditNew) => this.handleEditItem(dataEditNew)}
                />
            )
        })

    }

    handleDeleteItem = (id) => {
        this.isComponentDidMount = true;
        callApi(`news/${id}`, "DELETE", id)
            .then(res => {
                if (this.isComponentDidMount) {
                    var items = this.state.dataNews;
                    var index = this.findIndex(items, id);
                    if (index !== -1) {
                        items.splice(index, 1)
                        this.setState({
                            dataNews: items
                        });
                    }

                }
            })
        this.props.changeAlertShowStatus("Delete success !");
    }

    handleCreateItem = (itemNew) => {
        this.isComponentDidMount = true;
        callApi("news", "POST", itemNew)
            .then(res => {
                if (this.isComponentDidMount) {
                    var items = this.state.dataNews;
                    items.push(res.data);
                    this.setState({
                        dataNews: items
                    });
                }
            });
        this.props.changeCreateStatus();
        this.props.changeAlertShowStatus("Add new success !");
    }

    handleEditItem = (itemNew) => {
        this.isComponentDidMount = true;

        this.props.changeAlertShowStatus("Edit new success !");
        //this.props.changeEditStatus();
    }

    findIndex = (dataNews, id) => {
        var result = -1;
        dataNews.forEach((dataNew, index) => {
            if (dataNew.id_news === id) {
                result = index;
            }
        });
        return result;
    }

    showForm = () => {
        if (this.props.isCreate) {
            return <FormAdd doCreateItem={(itemNew) => this.handleCreateItem(itemNew)} />
        }

        if (this.props.isEdit) {
            return <FormEdit />
        }
    }
    render() {

        console.log("render");
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
        isEdit: state.isEdit,
        isRefresh: state.isRefresh,
        dataNews1: state.dataNews1
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeCreateStatus: () => {
            dispatch({
                type: "CHANGE_CREATE_STAUS"
            })
        },

        changeEditStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_STAUS"
            })
        },

        changeAlertShowStatus: (titleAlert) => {
            dispatch({
                type: "CHANGE_ALERT_SHOW_STAUS", titleAlert
            })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(New);