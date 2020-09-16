import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import New from '../features/news/New';
import User from '../features/users/User';

class RouterUrl extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/">
                        <New />
                    </Route>
                    <Route exact path="/new">
                        <New />
                    </Route>
                    <Route exact path="/user">
                        <User />
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default RouterUrl;