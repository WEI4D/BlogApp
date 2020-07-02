import React,{Component} from 'react';
import NavBar from "../NavBar/NavBar";
import "./note.css"
import Footer from "../Footer/Footer";
import { Route,Router,withRouter } from "react-router-dom";
import Catalogue from "../Catalogue/Catalogue";
import Book from "../Book/Book";
import NProgress from 'nprogress';
import '../../assets/css/nprogress.css';
export default class Note extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: -1
        }
    }
    componentWillMount() {
        NProgress.start();
    }
    componentDidMount() {
        NProgress.done();
    }

    render() {
        const history = require('history').createBrowserHistory();

        return (
            <Router history={history}>
                <div>
                    <NavBar/>
                    <div className="note">
                        <div className="note-items">
                            <Route path="/notes/list" component={ Catalogue }/>
                            <Route path="/notes/content" component={ Book }/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </Router>
        )
    }
}
