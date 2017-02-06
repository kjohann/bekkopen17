import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { Link } from 'react-router';

const TodoLists = ({todoLists}) => {
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <ul>
          {todoLists.map(l => {
            const link = `/todos/${l.id}`;
            return <li key={`list-${l.id}`}><Link to={link}>{l.name}</Link></li>
          })}
        </ul>
      </header>
    </div>
  );
}

const mapStateToProps = state => ({
  todoLists: state.todoLists
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoLists)
