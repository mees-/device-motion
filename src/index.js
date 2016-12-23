import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reducer from './reducer'
import { createStore } from 'redux'
const store = createStore(reducer)

ReactDOM.render(
  <App store={ store }/>,
  document.getElementById('root')
)

window.addEventListener('devicemotion', (event) => {
  const acc = event.acceleration
  const total = event.rotationRate

  const oldState = store.getState()
  store.dispatch({
    type: 'ADD_ACC',
    acc
  })
  store.dispatch({
    type: 'ADD_TOTAL',
    total
  })

  const newState = store.getState()

  const diff = {}

  diff.ax = Math.abs(oldState.acc.x - newState.acc.x)
  diff.ay = Math.abs(oldState.acc.y - newState.acc.y)
  diff.az = Math.abs(oldState.acc.z - newState.acc.z)

  diff.ta = Math.abs(oldState.total.alpha - newState.total.alpha)
  diff.tb = Math.abs(oldState.total.beta - newState.total.beta)
  diff.tg = Math.abs(oldState.total.gamma - newState.total.gamma)

  diff.total = diff.ax + diff.ay + diff.az + diff.ta + diff.tb + diff.tg
  store.dispatch({
    type: 'SET_DIFF',
    diff: diff.total
  })
}, false)
