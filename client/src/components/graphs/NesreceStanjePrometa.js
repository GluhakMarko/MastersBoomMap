import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import axios from "axios";

var data = [];

const serverLocation = require("../../config/keys.js").server;

export default class Test extends PureComponent {
  state = {
    dataLeto: [],
  };

  componentDidMount() {
    axios.get(`${serverLocation}/api/graph/31`).then((res) => {
      this.setState({ dataLeto: res.data });
      for (var key in this.state) {
        data.push(this.state[key]);
      }
    });
  }

  render() {
    return (
      <AreaChart
        width={500}
        height={300}
        data={this.state.dataLeto.podatki}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="promet" text-transform="uppercase" />
        <YAxis domain={[0, 70000]} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="nesrece"
          stroke="#66b2b2"
          fill="#66b2b2"
          dot={{ fill: "#008080", strokeWidth: 1 }}
        />
      </AreaChart>
    );
  }
}
