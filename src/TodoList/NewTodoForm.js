import React, { Component } from 'react';
import './NewTodoForm.css';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      task: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.addTodo(this.state.task);

    this.setState({
      task: '',
    });
  }

  render() {
    return (
      <section className='NewTodoForm'>
        <h2>New Todo</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.task}
            onChange={this.handleChange}
          />
          <button>
            <i className='fas fa-plus'></i>
          </button>
        </form>
      </section>
    );
  }
}
