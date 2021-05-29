import React, { Component } from 'react';
import './Todo.css';

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isCompleted: false,
      formValue: props.task,
      isFirstTimeRendered: true,
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSpanClick = this.handleSpanClick.bind(this);
  }

  handleDelete(e) {
    e.target.closest('.Todo').classList.remove('fade');

    setTimeout(() => {
      this.props.deleteTodo(this.props.id);
    }, 600);
  }

  handleEditButton() {
    this.setState({
      isEditing: true,
      isCompleted: false,
    });
  }

  handleForm(e) {
    e.preventDefault();

    this.props.editTodo(this.props.id, this.state.formValue);

    this.setState({
      isEditing: false,
    });
  }

  handleChange(e) {
    this.setState((prevState) => ({
      ...prevState,
      formValue: e.target.value,
    }));
  }

  handleSpanClick(e) {
    this.setState((prevState) => ({
      isCompleted: !prevState.isCompleted,
    }));
  }

  render() {
    if (this.state.isFirstTimeRendered) {
      setTimeout(
        () => {
          this.setState({ isFirstTimeRendered: false });
        },
        this.props.todos === 0 ? 650 : 100
      );
    }

    if (this.state.isEditing) {
      return (
        <div className='Todo fade'>
          <form action='' onSubmit={this.handleForm}>
            <input
              type='text'
              value={this.state.formValue}
              onChange={this.handleChange}
              autoFocus
            />
            <button>
              <i className='fas fa-check'></i>
            </button>
          </form>
        </div>
      );
    }

    return (
      <div className={`Todo ${this.state.isFirstTimeRendered ? '' : 'fade'}`}>
        <span
          className={this.state.isCompleted ? 'strikethrough' : ''}
          onClick={this.handleSpanClick}
        >
          {this.props.task}
        </span>
        <button
          id='tick'
          className={this.state.isCompleted ? 'strikethrough' : ''}
          onClick={this.handleSpanClick}
        >
          <i className='fas fa-check'></i>
        </button>
        <button onClick={this.handleDelete}>
          <i className='fas fa-trash-alt'></i>
        </button>
        <button onClick={this.handleEditButton}>
          <i className='fas fa-pencil-alt'></i>
        </button>
      </div>
    );
  }
}
