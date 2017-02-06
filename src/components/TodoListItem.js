import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class TodoListItem extends Component {
  static propTypes = {
    listItem: PropTypes.object.isRequired,
    deleteTodoList: PropTypes.func.isRequired,
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodoList(id)
    } else {
      this.props.editTodo(id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { listItem, deleteTodoList } = this.props

    const link = `/todos/${listItem.id}`;
    const element = (
        <div className="view">
          <label>
            <Link to={link}>{listItem.name}</Link>
          </label>
          <button className="destroy"
                  onClick={() => deleteTodoList(listItem.id)} />
        </div>
      )

    return (
      <li>
        {element}
      </li>
    )
  }
}
