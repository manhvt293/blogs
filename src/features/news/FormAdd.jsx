import React, { Component } from 'react';

class FormAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: ""
        }
    }

    isChange = (event) => {
        const valueInput = event.target.value;
        const nameInput = event.target.name;
        this.setState({
            [nameInput]: valueInput
        });
    }

    handleCreateItem = (event) => {
        event.preventDefault();
        const { title, content } = this.state;
        var itemNew = {};
        itemNew.title = title;
        itemNew.content = content;
        this.props.doCreateItem(itemNew);
    }
    render() {
        return (
            <div className="col-4">
                <div className="page-header">
                    <h3>
                        Create a new
                </h3>
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="Tille">Tille</label>
                        <input onChange={(event) => this.isChange(event)} type="text" name="title" className="form-control" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Tille">Content</label>
                        <textarea onChange={(event) => this.isChange(event)} className="form-control" name="content" rows="3"></textarea>
                    </div>
                    <button type="reset" onClick={(event) => { this.handleCreateItem(event) }} className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default FormAdd;