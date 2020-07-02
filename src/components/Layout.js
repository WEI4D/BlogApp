import React, { Component } from 'react';
import NavBar from "./NavBar/NavBar";
import '../assets/css/layout.css';
import Footer from "./Footer/Footer";
import Content from "./Content/Content";
class Layout extends Component {
    render() {
        return (
            <React.Fragment> {/*className="header-header"*/}
                <NavBar/>
                <Content/>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Layout;
