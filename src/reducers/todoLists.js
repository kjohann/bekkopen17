import { ADD_TODOLIST, DELETE_TODOLIST, GET_TODOLISTS } from '../constants/ActionTypes';
import uuidV4 from 'uuid/v4';

const initialState = []

export default function todoLists(state = initialState, action) {
  switch (action.type) {
    case GET_TODOLISTS:
      return action.payload;
    case ADD_TODOLIST:
      return [
        action.payload,
        ...state
      ]
    case DELETE_TODOLIST:
      return state.filter(todoList =>
        todoList.id !== action.id
      )
    default:
      return state;
  }
}
