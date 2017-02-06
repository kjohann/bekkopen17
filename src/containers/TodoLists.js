import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import { Link } from 'react-router';
import Header from '../components/Header'

const TodoLists = ({todoLists, actions}) => {
  return (
    <div>
      <Header addTodo={actions.addTodoList} placeholder="Create new list" />

      <section>
        <ul>
          {todoLists.map(l => {
            const link = `/todos/${l.id}`;
            return <li key={`list-${l.id}`}><Link to={link}>{l.name}</Link></li>
          })}
        </ul>
      </section>
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
