import React, { Component } from 'react';
import Template from './Template';
import CreateItem from './CreateItem';
import callApi from './../../api/axiosClient';
import EditItem from './EditItem';

class User extends Component {
  constructor(props) {
    super(props);
    this.isComponentDidMount = false;
    this.state = {
      isStatusCreate: false,
      isStatusEdit: false,
      dataEdit: {},
      dataUser: []
    }
  }

  doCreateItem = (item) => {
    this.isComponentDidMount = true;
    var itemUser = {};
    itemUser.username = item.userName;
    itemUser.name = item.fullName;
    itemUser.email = item.email;

    callApi("users", "post", itemUser)
      .then(res => {
        if (this.isComponentDidMount) {
          var items = this.state.dataUser;
          items.push(res.data);
          this.setState({
            dataUser: items
          });
        }
      })
    this.setState({
      isStatusCreate: !this.state.isStatusCreate
    });
  }

  doEditItem = (item) => {
    this.isComponentDidMount = true;
    var itemUser = {};
    itemUser.username = item.userName;
    itemUser.name = item.fullName;
    itemUser.email = item.email;
    callApi(`users/${item.id}`, "put", itemUser)
      .then(res => {
        if (this.isComponentDidMount) {
          var items = this.state.dataUser;
          items.forEach((value, name) => {
            if (value.id_user === res.data.id_user) {
              value.name = res.data.name;
              value.username = res.data.username;
              value.email = res.data.email;
            }
          })
          this.setState({
            dataUser: items
          });
        }
      })
  }
  showForm = () => {
    if (this.state.isStatusCreate) {
      return <CreateItem getDataCreate={(item) => this.doCreateItem(item)} />
    }
    if (this.state.isStatusEdit) {
      return <EditItem dataEdit={this.state.dataEdit} doEditItem={(dataNew) => this.doEditItem(dataNew)} />
    }
  }

  changeStatusCreate = () => {
    this.setState({
      isStatusCreate: !this.state.isStatusCreate
    });
  }

  changeStatusEdit = () => {
    this.setState({
      isStatusEdit: !this.state.isStatusEdit
    });
  }

  componentDidMount() {
    this.isComponentDidMount = true;
    this.allUsers();
  }

  allUsers = () => {
    callApi("users", "get", null)
      .then(res => {
        if (this.isComponentDidMount) {
          this.setState({
            dataUser: res.data
          });
        }
      })
  }

  doHandleDeleteItem = (id) => {
    this.isComponentDidMount = true;
    callApi(`users/${id}`, "delete", id)
      .then(res => {
        if (this.isComponentDidMount) {
          var items = this.state.dataUser;
          var index = this.findIndex(items, id);
          if (index !== -1) {
            items.splice(index, 1)
            this.setState({
              dataUser: items
            });
          }

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  findIndex = (dataUsers, id) => {
    var result = -1;
    dataUsers.forEach((dataUser, index) => {
      if (dataUser.id_user === id) {
        result = index;
      }
    });
    return result;
  }
  componentWillUnmount() {
    this.isComponentDidMount = false;
  }

  doHandleAtiveItem = (id, status) => {
    console.log(status);
    callApi(`users/${id}`, "put", { status: !status })
      .then(res => {
        if (this.isComponentDidMount) {
          var items = this.state.dataUser;
          items.forEach((value, name) => {
            if (value.id_user === res.data.id_user) {
              value.status = res.data.status;
            }
          })
          this.setState({
            dataUser: items
          });
        }
      })
  }

  getData = () => {

    return this.state.dataUser.map((value, key) => {
      let textActive = value.status.toString() === "true" ? "Enable" : "Disable";
      return (
        <Template
          editItem={(data) => this.editItem(value)}
          handleDeleteItem={(id) => this.doHandleDeleteItem(value.id_user)}
          key={key}
          id={value.id_user}
          email={value.email}
          name={value.name}
          username={value.username}
          textActive={textActive}
          handleAtiveItem={(id, status) => this.doHandleAtiveItem(value.id_user, value.status)}
        />
      )
    })
  }

  editItem = (data) => {
    this.changeStatusEdit();
    this.setState({
      dataEdit: data
    });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="page-header">
                <h3>
                  Manager User <button type="button" onClick={() => this.changeStatusCreate()} className="btn btn-success">New</button>
                </h3>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Email</th>
                    <th scope="col">FullName</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getData()}
                </tbody>
              </table>
            </div>
            {this.showForm()}
          </div>
        </div>
      </div>
    );
  }
}

export default User;