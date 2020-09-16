import React, { Component } from 'react';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      userName: this.props.dataEdit.username,
      fullName: this.props.dataEdit.name,
      email: this.props.dataEdit.email,
      id: this.props.dataEdit.id
    })
  }

  doEditItem = () => {
    var item = {};
    item.userName = this.state.userName;
    item.fullName = this.state.fullName;
    item.email = this.state.email;
    item.id = this.state.id;
    this.props.doEditItem(item);
  }

  isChange = (event) => {
    const nameInput = event.target.name;
    const valueInput = event.target.value;

    this.setState({
      [nameInput]: valueInput
    });
  }

  render() {
    return (
      <div className="col-4">
        <div className="page-header">
          <h3>
            Edit User
                    </h3>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="userName">UserName</label>
            <input disabled defaultValue={this.props.dataEdit.username} type="text" className="form-control" name="userName" id="userName" placeholder="Enter UserName" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input disabled defaultValue={this.props.dataEdit.email} type="text" className="form-control" name="email" id="email" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label htmlFor="fullName">FullName</label>
            <input onChange={(event) => this.isChange(event)} defaultValue={this.props.dataEdit.name} type="text" className="form-control" name="fullName" id="fullName" placeholder="Enter FullName" />
          </div>
          <button type="reset" onClick={() => this.doEditItem()} className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditItem;