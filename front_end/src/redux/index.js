import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'


const middleware = [thunk]

const initialState = {
  socket:{},
  user:{},
  appData:{},
  currentNetwork:null,
  currentNode:null,
  nodeStatus:[],
  index:0
}

export const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
)

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SOCKET':
      return{
        ...state,
        socket:action.payload
      }
    case 'SET_USER':
      return{
        ...state,
        user:action.payload
      }
    case 'GET_APP_DATA':
      return{
        ...state,
        appData:action.payload
      }
    case 'SET_NETWORK':
      return{
        ...state,
        currentNetwork:action.payload
      }
    case 'SET_NODE_STATUS':
      return{
        ...state,
        nodeStatus:action.payload
      }
    case 'SET_NODE':
      return{
        ...state,
        currentNode:action.payload
      }
    case 'SET_INDEX':
      return{
        ...state,
        index:action.payload
      }
    default:
      return state;
  }
}
