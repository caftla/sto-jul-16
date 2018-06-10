import React from "react";
import { render } from "react-dom";
import ARPUChart from "./ARPUChart";
import RevenueCostChart from "./RevenueCostChart";
import BreakevenChart from "./BreakevenChart";
import * as R from "ramda";

const {Plotly, data} = window
const {d3} = Plotly

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  width: '1240px',
  margin: 'auto'
};

class Country extends React.Component {
  render() {
    return <div>
      <h2>{ this.props.country_code }</h2>
      {
        R.sortBy(g => -1 * (g.revenue || 0 + g.cost || 0))(this.props.data).map(g =>
          <div key={ g.gateway } style={{ borderBottom: 'solid 1px gray', padding: '1em 0 1em 0' }}>
            <h3>{g.country_code} {g.gateway} Sales: {d3.format(',')(g.sales)}, Rev: ${d3.format(',.0f')(g.revenue)}, Cost: ${d3.format(',.0f')(g.cost)}</h3>
            <div className="chart-container">
              <div className="chart-title"><h4>ARPU / eCPA and Sales</h4></div>
              <ARPUChart data={g.data} />
            </div>
            <div className="chart-container">
              <div className="chart-title" style={{ height: '250px' }}><h4>Breakeven</h4></div>
              <BreakevenChart data={g.data} />
            </div>
            <div className="chart-container">
              <div className="chart-title" style={{height: '250px'}}><h4>Revenue and Cost</h4></div>
              <RevenueCostChart data={g.data} />
            </div>
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
    <ListOf data={data} />
  </div>
);

render(<App />, document.getElementById("root"));
