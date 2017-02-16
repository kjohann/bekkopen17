import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as TodoActions from '../actions'
import Header from '../components/Header'
import TodoListItem from '../components/TodoListItem';

class TodoLists extends React.Component {
  constructor(props) {
    super(props);

    props.actions.getTodoLists();
  }

  render() {
    const {todoLists, actions} = this.props;
    return (
      <div>
        <Header addTodo={actions.addTodoList} placeholder="Create new list" />

        <section className="main">
          <ul className="todo-list">
            {todoLists.map(l => {
              return <TodoListItem key={`list-${l.id}`} listItem={l} {...actions}/>
            })}
          </ul>
        </section>
      </div>
    );
  }
}

TodoLists.propTypes = {
  todoLists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
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
