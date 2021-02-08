import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";

import Home from '../pages/home/home';
import Lobby from "../pages/lobby/lobby";
import Room from '../pages/room/room';

const RouterNavigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/lobby" exact component={Lobby} />
                <Route path="/room" exact component={Room} />
            </Switch>
        </BrowserRouter>
    )
}

export default RouterNavigation
