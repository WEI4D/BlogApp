import React,{Component} from 'react';
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import './blogcontent.css'
import { Route, Router } from "react-router-dom";
import Catalogue from "../Catalogue/Catalogue";
import Technology from "../Technology/Technology";

export default class BlogContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const history = require('history').createBrowserHistory();
        return (
            <Router history={history}>
                <div>
                    <NavBar/>
                    <div className="note">
                        <div className="note-items">
                            <Route path="/blog/list" component={ Catalogue }/>
                            <Route path="/blog/content" component={ Technology }/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
