import React from 'react';

FormEdit.propTypes = {

};

function FormEdit(props) {
    return (
        <div className="col-4">
            <div className="page-header">
                <h3>
                    Edit new
                </h3>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="Tille">Tille</label>
                    <input type="text" name="title" className="form-control" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="Tille">Content</label>
                    <textarea className="form-control" name="content" rows="3"></textarea>
                </div>
                <button type="reset" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default FormEdit;