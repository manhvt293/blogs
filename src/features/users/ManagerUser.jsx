import React, { Component } from 'react';
import Template from './Template';
import CreateItem from './CreateItem';
import callApi from './../../../utils/callApi';
import EditItem from './EditItem';

class ManagerUser extends Component {
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
    console.log(itemUser);
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
            if (value.id === res.data.id) {
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
      if (dataUser.id === id) {
        result = index;
      }
    });
    return result;
  }
  componentWillUnmount() {
    this.isComponentDidMount = false;
  }

  getData = () => {
    return this.state.dataUser.map((value, key) => {
      return (
        <Template
          editItem={(data) => this.editItem(value)}
          handleDeleteItem={(id) => this.doHandleDeleteItem(value.id)}
          key={key}
          id={value.id}
          email={value.email}
          name={value.name}
          username={value.username}
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
            <div className="col-12">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                          </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" href="#">Disabled</a>
                    </li>
                  </ul>
                  <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                  </form>
                </div>
              </nav>
            </div>
          </div>
        </div>
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

export default ManagerUser;