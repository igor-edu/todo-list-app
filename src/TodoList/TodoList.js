import React, { Component } from 'react';
import Todos from './Todos';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import { v4 as uuid } from 'uuid';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: this.getTodosFromLocalStorage(),
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  addTodo(task) {
    const newTodo = {
      task: task,
      id: uuid(),
    };

    if (this.state.todos.length === 0) {
      document.getElementById('todos-paragraph').classList.remove('appear');

      setTimeout(() => {
        this.setState((prevState) => ({
          ...prevState,
          todos: [...prevState.todos, newTodo],
        }));
      }, 600);

      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      todos: [...prevState.todos, newTodo],
    }));
  }

  deleteTodo(id) {
    this.setState((prevState) => ({
      ...prevState,
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));
  }

  editTodo(id, task) {
    const newTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: task };
      } else {
        return { ...todo };
      }
    });

    this.setState((prevState) => ({
      ...prevState,
      todos: newTodos,
    }));
  }

  getTodosFromLocalStorage() {
    try {
      return JSON.parse(localStorage.getItem('todos')) || [];
    } catch (error) {
      return [];
    }
  }

  updateLocalStorage(newTodos) {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

  render() {
    this.updateLocalStorage(this.state.todos);
    return (
      <div className='TodoList'>
        <header>
          <h1>Todo List!</h1>
          <p>A Simple React Todo List App.</p>
        </header>
        <Todos
          todos={this.state.todos}
          deleteTodo={this.deleteTodo}
          editTodo={this.editTodo}
        />
        <NewTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}
