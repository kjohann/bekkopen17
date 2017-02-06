import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux';
import todos from './todos'
import todoLists from './todoLists'

const rootReducer = combineReducers({
  routing: routerReducer,
  todos,
  todoLists
})

export default rootReducer
