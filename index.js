const counterReducer = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT': return state + 1
    case 'DECREMENT': return state - 1
    default: return state
  }
}

const createStore = (reducer) => {
  let state

  const listeners = []

  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l => l !== listener)
    } 
  }

  dispatch({})

  return { getState, dispatch, subscribe }
}

const { getState, dispatch } = createStore(counterReducer)

console.log(getState())

dispatch({
  type: 'INCREMENT'
})
dispatch({
  type: 'INCREMENT'
})
dispatch({
  type: 'INCREMENT'
})
console.log(getState())

dispatch({
  type: 'DECREMENT'
})

console.log(getState())
