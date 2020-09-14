import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

FormEdit.propTypes = {
    dataEdit: PropTypes.shape({
        id_news: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.string,
        image: PropTypes.string,
        addtime: PropTypes.number
    }),

};

function FormEdit(props) {
    const { title, content, id_news } = props.dataEdit;
    const [value, setValue] = useState({
        id_news: id_news,
        title: title,
        content: content
    });

    const isChange = (event) => {
        const nameInput = event.target.name;
        const valueInput = event.target.value;

        setValue({
            ...value,
            [nameInput]: valueInput
        });
    }

    const onSubmitEditItem = () => {
        const dataNew = {
            title: value.title,
            content: value.content,
            id_news: value.id_news
        }

        props.handleEditItem(dataNew);
    }

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
                    <input defaultValue={title} onChange={(event) => isChange(event)} type="text" name="title" className="form-control" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="Tille">Content</label>
                    <textarea onChange={(event) => isChange(event)} defaultValue={content} className="form-control" name="content" rows="3"></textarea>
                </div>
                <button type="reset" onClick={onSubmitEditItem} className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        dataEdit: state.dataEdit
    }
}

export default connect(mapStateToProps)(FormEdit);