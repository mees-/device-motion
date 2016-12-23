import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = props.store.getState()

    props.store.subscribe(() => {
      this.setState(props.store.getState())
    })

    this.reset = this.reset.bind(this)
  }
  render() {
    return (
      <div className="App">
        <div>
          <h3>acc</h3>
          <ul>
            <li> x: { Math.floor(this.state.acc.x) }</li>
            <li> y: { Math.floor(this.state.acc.y) }</li>
            <li> z: { Math.floor(this.state.acc.z) }</li>
          </ul>
        </div>
        <div>
          <h3>total</h3>
          <ul>
            <li> alpha: { Math.floor(this.state.total.alpha) }</li>
            <li> beta: { Math.floor(this.state.total.beta) }</li>
            <li> gamma: { Math.floor(this.state.total.gamma) }</li>
          </ul>
        </div>

        <h1> { this.state.diff > 15 ? 'MOVING' : 'STILL' }</h1>
        <p>diff: { Math.floor(this.state.diff) }</p>
        <button onClick={this.reset}>reset</button>
      </div>
    )
  }
  reset() {
    this.props.store.dispatch({
      type: null
    })
  }
}

export default App
