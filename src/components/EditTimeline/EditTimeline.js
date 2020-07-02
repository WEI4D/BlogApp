import React,{Component} from 'react';
import EditableFormTable from "../EditableFormTable";
export default class EditMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeItems: [
                {
                    id: "",
                    time: "",
                    color: "green",
                    progress: [

                    ],

                }
            ],
            test: 0
        }
    }
    render() {
        return(
            <div>
                <EditableFormTable data={this.state.test}/>
            </div>
        )
    }

}
