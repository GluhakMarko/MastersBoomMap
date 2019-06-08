import React, {PureComponent} from 'react';
import ResponsiveContainter, {ResponsiveContainer} from "recharts";
import axios from 'axios';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


var data = [
];

export default class DneviChart extends PureComponent {

    state = {
        datag: [],
    }

    componentDidMount() {
        axios.get('http://localhost:5000/api/graph/24').then(res => {
            this.setState({datag: res.data});
            console.log(res.data);
            for(var key in this.state) {
                data.push(this.state[key]);
                // console.log(this.state[key]);
                //this.setState({dataLeto: data[key]});
            }
        });
    }

    render() {
        return (
            <BarChart
                width={500}
                height={300}
                data={this.state.datag.podatki}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="dan" interval={0} fontSize={12}/>
                <YAxis domain={[0, 25000]}/>
                <Tooltip/>
                <Legend/>
                <Bar layout="horizontal" dataKey="nesrece" fill="#7ca6b0" fillOpacity="0.7" label={{ fill: 'white', fontSize: 10 }}/>
            </BarChart>
        );
    }
}