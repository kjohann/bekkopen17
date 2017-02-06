import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
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

const middleware = applyMiddleware(
  routerMiddleware(browserHistory),
  createLogger({
    predicate: () => true
  }
));

const store = createStore(reducer, {}, compose(
  middleware,
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/">
        <IndexRoute component={TodoLists} />
        <Route path="/todos/:listId" component={Todo} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)