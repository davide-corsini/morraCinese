import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Game from "./screens/game/Game";
import Login from "./screens/login/Login";
import Ranking from "./screens/ranking/Ranking";
import Registration from "./screens/registration/Registration";
import Prova from "./screens/Prova";
const Routing = () => {
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/ranking" component={Ranking} />
                    <Route path="/game:id" component={Game} />
                    <Route path="/prova" component={Prova} />
                </Switch>
            </>
        </Router>
    );
}
export default Routing;