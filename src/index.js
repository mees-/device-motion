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
  store.dispatch({
    type: 'ADD_ACCELERATION',
    acceleration: event.acceleration
  })
  store.dispatch({
    type: 'ADD_ROTATIONRATE',
    rotationRate: event.rotationRate
  })
  store.dispatch({
    type: 'ADD_INTERVAL',
    interval: event.interval
  })
}, false)
