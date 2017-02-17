import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware, syncHistoryWithStore  } from 'react-router-redux';
import { Provider } from 'react-redux'
import Todo from './containers/Todo'
import TodoLists from './containers/TodoLists'
import NotFound from './containers/NotFound';
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import './main.css'
import createLogger from 'redux-logger';
import ajaxMiddleware from './middleware/ajaxMiddleware';
import AuthService from './AuthService';
import Login from './containers/Login';

const auth = new AuthService();

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const middleware = applyMiddleware(
  routerMiddleware(hashHistory),
  ajaxMiddleware,
  createLogger({
    predicate: () => true
  }
));

const store = createStore(reducer, {}, compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={TodoLists} />
        <Route path="/todos/:listId" component={Todo} onEnter={requireAuth} />
        <Route path="/login" component={Login} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
