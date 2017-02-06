import * as types from '../constants/ActionTypes'

export const addTodo = ({text, listId}) => ({ type: types.ADD_TODO, text, listId })
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const addTodoList = text => ({ type: types.ADD_TODOLIST, text })
export const deleteTodoList = id => ({type: types.DELETE_TODOLIST, id})


export const createAsyncAction = (promise, onSuccess) => {
  return {
    type: types.AJAX_REQUEST,
    payload: {
      promise,
      onSuccess
    }
  };
};
