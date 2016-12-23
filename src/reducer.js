export default function reducer(oldState, action) {
  switch (action.type) {
    case 'SET_ACC':
      return { ...oldState, acc: action.acc }
    case 'SET_TOTAL':
      return { ...oldState, total: action.total }
    case 'ADD_ACC':
      return {
        ...oldState,
        acc: {
          x: oldState.acc.x + action.acc.x,
          y: oldState.acc.y + action.acc.y,
          z: oldState.acc.z + action.acc.z
        }
      }
    case 'ADD_TOTAL':
      return {
        ...oldState,
        total: {
          alpha: oldState.total.alpha + action.total.alpha,
          beta: oldState.total.beta + action.total.beta,
          gamma: oldState.total.gamma + action.total.gamma
        }
      }
    case 'SET_DIFF':
      return {
        ...oldState,
        diff: action.diff
      }
    default:
      return {
        acc: {
          x: 0,
          y: 0,
          z: 0
        },
        total: {
          alpha: 0,
          beta: 0,
          gamma: 0
        },
        diff: 0
      }
  }
}
