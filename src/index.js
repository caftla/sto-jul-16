import React from "react";
import { render } from "react-dom";
import ARPUChart from "./ARPUChart";
import RevenueCostChart from "./RevenueCostChart";
import * as R from "ramda";

const {Plotly, data} = window
const {d3} = Plotly

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class Country extends React.Component {
  render() {
    return <div>
      <h2>{ this.props.country_code }</h2>
      {
        R.sortBy(g => -1 * (g.revenue || 0 + g.cost || 0))(this.props.data).map(g =>
          <div key={ g.gateway }>
            <h3>{g.country_code} {g.gateway} Sales: {d3.format(',')(g.sales)}, Rev: ${d3.format(',.0f')(g.revenue)}, Cost: ${d3.format(',.0f')(g.cost)}</h3>
            <ARPUChart data={g.data} />
            <RevenueCostChart data={g.data} />
          </div>
        )
      }
    </div>
  }
}

class ListOf extends React.Component {
  constructor(props) {
    super(props)
    this.state = {visibleIndex: 0 }
  }

  render() {
    return <div>
      <select onChange={ ev => this.setState({visibleIndex: parseInt(ev.target.value)}) }>
        {
          this.props.data.map((d, i) => <option key={ i.toString() } value={ i }>{ d.country_code }</option>)
        }
      </select>
      <div>
        <Country {... this.props.data[this.state.visibleIndex]} />
      </div>
    </div>
  }
}

const App = () => (
  <div style={styles}>
    <ListOf data={ data } />
  </div>
);

render(<App />, document.getElementById("root"));
