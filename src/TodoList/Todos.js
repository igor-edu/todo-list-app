import React, { Component } from 'react';
import Todo from './Todo';
import './Todos.css';

export default class Todos extends Component {
  render() {
    const pClass = this.props.todos.length === 0 ? 'appear' : '';

    const todosList = this.props.todos.map((todo) => (
      <Todo
        task={todo.task}
        id={todo.id}
        key={todo.id}
        deleteTodo={this.props.deleteTodo}
        editTodo={this.props.editTodo}
        todos={this.props.todos}
      />
    ));

    return (
      <section className='Todos'>
        <p className={pClass} id='todos-paragraph'>
          'No Todos Yet. Add New Todos!'
        </p>
        {todosList}
      </section>
    );
  }
}
