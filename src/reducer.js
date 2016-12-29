export default function reducer(oldState, action) {
  switch (action.type) {
    case 'ADD_ACCELERATION':
      return {
        ...oldState,
        acceleration: {
          x: oldState.acceleration.x + action.acceleration.x,
          y: oldState.acceleration.y + action.acceleration.y,
          z: oldState.acceleration.z + action.acceleration.z
        },
        diff: {
          ...oldState.diff,
          acceleration: {
            ...oldState.diff.acceleration,
            x: Math.abs(oldState.acceleration.x - (oldState.acceleration.x + action.acceleration.x)),
            y: Math.abs(oldState.acceleration.y - (oldState.acceleration.y + action.acceleration.y)),
            z: Math.abs(oldState.acceleration.z - (oldState.acceleration.z + action.acceleration.z)),
            total: Math.abs(oldState.acceleration.x - (oldState.acceleration.x + action.acceleration.x)) +
              Math.abs(oldState.acceleration.y - (oldState.acceleration.y + action.acceleration.y)) +
              Math.abs(oldState.acceleration.z - (oldState.acceleration.z + action.acceleration.z))
          },
          total: oldState.diff.rotationRate.total +
            Math.abs(oldState.acceleration.x - (oldState.acceleration.x + action.acceleration.x)) +
            Math.abs(oldState.acceleration.y - (oldState.acceleration.y + action.acceleration.y)) +
            Math.abs(oldState.acceleration.z - (oldState.acceleration.z + action.acceleration.z))
        },
        lastDiffs: [
          oldState.diff.rotationRate.total +
            Math.abs(oldState.acceleration.x - (oldState.acceleration.x + action.acceleration.x)) +
            Math.abs(oldState.acceleration.y - (oldState.acceleration.y + action.acceleration.y)) +
            Math.abs(oldState.acceleration.z - (oldState.acceleration.z + action.acceleration.z)),
          ...oldState.lastDiffs.slice(0, 200)
        ]
      }
    case 'ADD_ROTATIONRATE':
      return {
        ...oldState,
        rotationRate: {
          alpha: oldState.rotationRate.alpha + action.rotationRate.alpha,
          beta: oldState.rotationRate.beta + action.rotationRate.beta,
          gamma: oldState.rotationRate.gamma + action.rotationRate.gamma
        },
        diff: {
          ...oldState.diff,
          rotationRate: {
            alpha: Math.abs(oldState.rotationRate.alpha - (oldState.rotationRate.alpha + action.rotationRate.alpha)),
            beta: Math.abs(oldState.rotationRate.beta - (oldState.rotationRate.beta + action.rotationRate.beta)),
            gamma: Math.abs(oldState.rotationRate.gamma - (oldState.rotationRate.gamma + action.rotationRate.gamma)),
            total: Math.abs(oldState.rotationRate.alpha - (oldState.rotationRate.alpha + action.rotationRate.alpha)) +
              Math.abs(oldState.rotationRate.beta - (oldState.rotationRate.beta + action.rotationRate.beta)) +
              Math.abs(oldState.rotationRate.alpha - (oldState.rotationRate.alpha + action.rotationRate.alpha))
          },
          total: oldState.diff.acceleration.total +
            Math.abs(oldState.rotationRate.alpha - (oldState.rotationRate.alpha + action.rotationRate.alpha)) +
            Math.abs(oldState.rotationRate.beta - (oldState.rotationRate.beta + action.rotationRate.beta)) +
            Math.abs(oldState.rotationRate.alpha - (oldState.rotationRate.alpha + action.rotationRate.alpha))
        }
      }
    case 'CHANGE_SENSITIVITY':
      return {
        ...oldState,
        sensitivity: action.value
      }
    case 'ADD_INTERVAL':
      return {
        ...oldState,
        interval: [action.interval, ...oldState.interval.slice(0, 100)]
      }
    default:
      return {
        sensitivity: 20,
        lastDiffs: [],
        interval: [],
        acceleration: {
          x: 0,
          y: 0,
          z: 0
        },
        rotationRate: {
          alpha: 0,
          beta: 0,
          gamma: 0
        },
        diff: {
          acceleration: {
            x: 0,
            y: 0,
            z: 0,
            total: 0
          },
          rotationRate: {
            alpha: 0,
            beta: 0,
            gamma: 0,
            total: 0
          },
          total: 0
        }
      }
  }
}
