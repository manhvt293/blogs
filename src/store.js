var redux = require("redux");

const newInitialState = {
    isEdit: false,
    isCreate: false,
    isAlertShow: false,
    titleAlert: "",
    dataEdit: {},
}

const newReducer = (state = newInitialState, action) => {
    switch (action.type) {
        case "CHANGE_CREATE_STAUS":
            return {...state, isCreate: !state.isCreate }

        case "CHANGE_EDIT_STAUS":
            return {...state, isEdit: !state.isEdit }
        case "GET_DATA_EDIT":
            return {...state, dataEdit: action.dataEdit }

        case "CHANGE_ALERT_HIDE_STAUS":
            return {...state, isAlertShow: false }
        case "CHANGE_ALERT_SHOW_STAUS":
            return {...state, isAlertShow: true, titleAlert: action.titleAlert }

        default:
            return state
    }
}
var store = redux.createStore(newReducer);
store.subscribe(() => {
    //console.log(JSON.stringify(store.getState()));
})
export default store;