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
import './Routing.css'



const Routing = (prop) => {



    return (
        <Router>

            <div style={{ width: '100', height: '100' }} className="LoginContainer">

                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/registration" component={Registration} />
                    <Route path="/ranking" component={Ranking} />
                    <Route path="/game/" component={Game} />
                    <Route path="/prova" component={Prova} />
                </Switch>
            </div>
        </Router>
    );
}
export default Routing;