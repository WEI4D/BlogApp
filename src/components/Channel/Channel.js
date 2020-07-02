import React, {Component} from 'react';

export default class Channel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
               <div style={{
                   position: "absolute",
                   top: "10%",
                   left: "50%",
                   transform: "translate(-50%)"
               }}>
                   <h1>🎄🎄🎄🎄🎄🎄🎄🎄🎄</h1>
                   <h1>🎄🎄DEVELOPING🎄🎄</h1>
                   <h1>🎄🎄🎄🎄🎄🎄🎄🎄🎄</h1>
               </div>
            </React.Fragment>
        )
    }
}
