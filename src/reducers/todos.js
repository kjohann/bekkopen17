import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED, GET_TODOS } from '../constants/ActionTypes'

const initialState = []

export const getByListId = (id, todos) => {
  console.log(todos, id)
  return todos.filter(t => t.listId === id);
}

export default function todos(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return action.payload.todos;
    case ADD_TODO:
      return [
        action.payload,
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, text: action.text }
          : todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id
          ? { ...todo, completed: action.completed }
          : todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
