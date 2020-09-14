import React, { Component } from 'react';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state=({
      userName :'',
      email : '',
      fullName : ''
    })
  }
  
  
  isChange=(event)=>{
    const nameInput = event.target.name;
    const valueInput = event.target.value;
    this.setState({
      [nameInput] : valueInput
    });
  }

  dataCreate=()=>{
    var item = {};
    item.userName = this.state.userName;
    item.email = this.state.email;
    item.fullName = this.state.fullName;
    this.props.getDataCreate(item);
  }
    render() {
        return (
            <div className="col-4">
                  <div className="page-header">
                    <h3>
                      Add New User
                    </h3>
                  </div>
                  <form>
                    <div className="form-group">
                      <label htmlFor="userName">UserName</label>
                      <input type="text" onChange={(event)=>this.isChange(event)} className="form-control" name="userName" id="userName" placeholder="Enter UserName" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" onChange={(event)=>this.isChange(event)} className="form-control" name="email" id="email" placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="fullName">FullName</label>
                      <input type="text" onChange={(event)=>this.isChange(event)} className="form-control" name="fullName" id="fullName" placeholder="Enter FullName" />
                    </div>
                    <button type="reset" onClick={()=>this.dataCreate()} className="btn btn-primary">Submit</button>
                  </form>
                </div>
        );
    }
}

export default CreateItem;