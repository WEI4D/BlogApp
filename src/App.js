import { Router, Route,Switch } from 'react-router-dom'
import React from 'react';
import Home from "./components/Home";
import Note from "./components/Note/Note";
import BlogContent from "./components/BlogContent/BlogContent";
import LinkContent from "./components/LinkContent/LinkContent";
import BlogManager from "./components/BlogManager/BlogManager";
import Display from "./components/Display/Display";
import Lab from "./components/Lab/Lab";
import Recent from "./components/Recent/Recent";
import Channel from "./components/Channel/Channel"

function App() {
    const history = require("history").createBrowserHistory();

    return (
        <Router history={history}>
            <Switch>
                <Route path="/link" component={ LinkContent }/>
                <Route path="/blog/list" component={ BlogContent }/>
                <Route path="/" exact={true} component={ Home }/>
                <Route path="/notes/list" component={ Note }/>
                <Route path="/lab" component={ Lab }/>
                <Route path="/blogmanager" component={ BlogManager }/>
                <Route path="/display" component={ Display }/>
                <Route path="/recent" component={ Recent }/>
                <Route path="/channel" component={ Channel }/>
            </Switch>
        </Router>
      );
}

export default App;
