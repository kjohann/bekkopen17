import * as types from '../constants/ActionTypes'
import { apiPromiseWrapper } from '../utils';
import * as request from 'superagent';
import * as config from '../config';

export const getTodoLists = () => {
  const promise = apiPromiseWrapper(request.get(`${config.apiUrl}/GetTodoLists`).accept('json'))
  return createAsyncAction(promise, dispatchWithPayload(types.GET_TODOLISTS));
}

export const getTodos = listId => {
  const promise = apiPromiseWrapper(request.get(`${config.apiUrl}/GetTodosByTodoListId?todoListId=${listId}`).accept('json'))
  return createAsyncAction(promise, dispatchWithPayload(types.GET_TODOS));
}

export const addTodo = ({text, listId}) => {
//({ type: types.ADD_TODO, text, listId })
  const promise = apiPromiseWrapper(request.post(`${config.apiUrl}/AddTodo?todoListId=${listId}`).accept('json').type('json').send({ text }));
  return createAsyncAction(promise, dispatchWithPayload(types.ADD_TODO));
}

export const deleteTodo = id => {
  const promise = apiPromiseWrapper(request.del(`${config.apiUrl}/DeleteTodo?todoId=${id}`).accept('json'));
  return createAsyncAction(promise, dispatchWithPayload(types.DELETE_TODO));
}
// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => {
  const promise = apiPromiseWrapper(request.put(`${config.apiUrl}/UpdateTodo?todoId=${id}`).accept('json').type('json').send({ text }));
  return createAsyncAction(promise, dispatchWithPayload(types.EDIT_TODO));
}
// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => {
  const promise = apiPromiseWrapper(request.put(`${config.apiUrl}/UpdateTodo?todoId=${id}`).accept('json').type('json').send({ completed: true }));
  return createAsyncAction(promise, dispatchWithPayload(types.COMPLETE_TODO));
}
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAll = () => ({ type: types.COMPLETE_ALL }) //TODO
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED }) //TODO

export const addTodoList = text => {
  const promise = apiPromiseWrapper(request.post(`${config.apiUrl}/AddTodoList`).accept('json').type('json').send({ name: text }));
  return createAsyncAction(promise, dispatchWithPayload(types.ADD_TODOLIST));
}
// export const addTodoList = text => ({ type: types.ADD_TODOLIST, text })

export const deleteTodoList = id => {
  const promise = apiPromiseWrapper(request.del(`${config.apiUrl}/DeleteTodoList?todoListId=${id}`).accept('json'));
  return createAsyncAction(promise, dispatchWithPayload(types.DELETE_TODOLIST));
}
// export const deleteTodoList = id => ({type: types.DELETE_TODOLIST, id})

const createAsyncAction = (promise, onSuccess) => {
  return {
    type: types.AJAX_REQUEST,
    payload: {
      promise,
      onSuccess
    }
  };
};

const dispatchWithPayload = (type) => {
  return ((dispatch, res) => {
    dispatch({
      type,
      payload: res
    });
  });
};
