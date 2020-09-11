import React from 'react';
import PropTypes from 'prop-types';

FormEdit.propTypes = {
    dataEdit: PropTypes.shape({
        id_news: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        image: PropTypes.string,
        addtime: PropTypes.string
    }),
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
                    <input defaultValue={this.props.title} type="text" name="title" className="form-control" placeholder="Enter title" />
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