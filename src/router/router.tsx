import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Lobby from '../pages/lobby/lobby';
import Room from '../pages/room/room';

const RouterNavigation = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Lobby />
                </Route>
                <Route path="/room" exact>
                    <Room />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouterNavigation
