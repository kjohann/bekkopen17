import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import { getByListId } from '../reducers/todos';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.getTodos(this.props.listId);
  }

  render() {
    const { todos, actions, listId } = this.props;
    const addTodoWrapped = text => {
      actions.addTodo({text, listId});
    }

    return (
      <div>
        <Header addTodo={addTodoWrapped} placeholder="What needs to be done?" />
        <MainSection todos={todos} actions={actions} />
      </div>
    )
  }
}

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  todos: getByListId(ownProps.params.listId, state.todos),
  listId: ownProps.params.listId
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo)
