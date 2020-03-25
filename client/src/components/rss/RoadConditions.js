
import React from 'react';
import axios from "axios";
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';
const serverLocation = require("../../config/keys.js").server;


var data = [];
var parsed;
class RoadConditions extends React.Component {
    state = {
        datag: []
    };


    componentDidMount() {
        axios.get(`${serverLocation}/api/content/road-conditions`).then(res => {
            this.setState({ datag: res.data }, () => console.log("Updated state"));
            for (var key in this.state) {
                data.push(this.state[key]);
            }

        });
    }

    render() {
        let numbers;
        let dataS =this.state.datag;
      //  let html;
        console.log(dataS);
        if (dataS.items) {
                numbers = dataS.items.map(item => {
                    //console.log("Iterating through for item " + item.title);

                   parsed=parse(item.description);
                    return parsed;
                    // <li><b>{item.title}</b> <br/> {item.description}<br/></li>;

                });
        }
        return (
            <div className="containerConditions">
                <div className="col-xs-8">
                    <h4>{this.state.datag.title}</h4>
                    <ul>{numbers}</ul>
                </div>
            </div>
        );
    }
}
export default RoadConditions;
