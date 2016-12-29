import React, { Component } from 'react'
import './App.css'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = props.store.getState()

    props.store.subscribe(() => {
      this.setState(props.store.getState())
    })

    this.reset = this.reset.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
    this.determineMoving = this.determineMoving.bind(this)
    this.betterDetermineMoving = this.betterDetermineMoving.bind(this)
  }
  render() {
    return (
      <div className='App'>
        <div>
          <h3>acceleration</h3>
          <ul>
            <li> x: { Math.floor(this.state.acceleration.x) }</li>
            <li> y: { Math.floor(this.state.acceleration.y) }</li>
            <li> z: { Math.floor(this.state.acceleration.z) }</li>
          </ul>
        </div>
        <div>
          <h3>rotationRate</h3>
          <ul>
            <li>alpha: { Math.floor(this.state.rotationRate.alpha) }</li>
            <li>beta: { Math.floor(this.state.rotationRate.beta) }</li>
            <li>gamma: { Math.floor(this.state.rotationRate.gamma) }</li>
          </ul>
        </div>

        <h1
          className={ this.betterDetermineMoving() ? 'text text-moving' : 'text text-still' }
        >
          { this.betterDetermineMoving() ? 'MOVING' : 'STILL' }
        </h1>
        <p> interval: { Math.round(this.state.interval.reduce((a, b) => a + b, 0) /
          this.state.interval.length * 100000) / 100000 } ms </p>
        <p> diff: { Math.floor(this.state.diff.total) } </p>
        <p> sensitivity: { this.state.sensitivity } </p>
        <Slider
          onChange={ this.onSliderChange }
          defaultValue={ this.state.sensitivity }
          min={ 0 }
          max={ 100 }
        />
        <br />
        <button onClick={ this.reset }>reset</button>
      </div>
    )
  }
  reset() {
    this.props.store.dispatch({
      type: null
    })
  }
  onSliderChange(value) {
    this.props.store.dispatch({
      type: 'CHANGE_SENSITIVITY',
      value
    })
  }

  betterDetermineMoving() {
    const amountLast = 10
    const last = this.state.lastDiffs.slice(0, amountLast).reduce((a, b) => a + b, 0)
    return last > amountLast * this.state.sensitivity
  }
  determineMoving() {
    return this.state.diff.total > this.state.sensitivity
  }
}

export default App
