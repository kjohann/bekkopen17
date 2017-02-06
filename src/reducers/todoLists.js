import { ADD_TODOLIST, DELETE_TODOLIST } from '../constants/ActionTypes';
import uuidV4 from 'uuid/v4';

const initialState = [
  {
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    name: 'Default'
  }
]

export default function todoLists(state = initialState, action) {
  switch (action.type) {
    case ADD_TODOLIST:
      return [
        {
          id: uuidV4(),
          name: action.text
        },
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
