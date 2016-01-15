import * as _ from 'lodash';

import alt from '../libs/alt';
import todoActions from '../actions/todo';
import commonConfig from '../configs/common';

let LOCALSTORAGE_NAMESPACE = commonConfig.storage.LOCALSTORAGE_NAMESPACE;

class todoStore {

  constructor(){

  	this.state = {
			todos: this.store(LOCALSTORAGE_NAMESPACE + '.todos'),
			nowShowing: this.store(LOCALSTORAGE_NAMESPACE + '.nowShowing') || app.ALL_TODOS,
			editing: this.store(LOCALSTORAGE_NAMESPACE + '.editing') || null
		}

    this.bindActions(todoActions);
  }

  store(namespace, data) {
		if (data) return localStorage.setItem(namespace, JSON.stringify(data));

		var store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || [];
	}

 
  addTodo(todo) {
		this.setState({
			//todos: this.state.todos.concat(todo)
			todos: _.sortBy(this.state.todos.concat(todo), 'title').reverse()
			//_.sortBy(users, ['user', 'age']);
		});



		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	toggleAll(checked) {
		var updatedTodos = this.state.todos.map(function (todo) {
			return _.extend({}, todo, {completed: checked});
		});

		this.setState({
			todos: updatedTodos
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	toggle(todoToToggle) {
		var updatedTodos = this.state.todos.map(function (todo) {
			return todo !== todoToToggle ?
				todo :
				_.extend({}, todo, {completed: !todo.completed});
		});

		this.setState({
			todos: updatedTodos
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	destroy(todoToDestroy) {
		var updatedTodos = this.state.todos.filter(function (todo) {
			return todo !== todoToDestroy;
		});

		this.setState({
			todos: updatedTodos
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	save(command) {
		var updatedTodos = this.state.todos.map(function (todo) {
			return todo !== command.todoToSave ?
				todo :
				_.extend({}, command.todoToSave, {title: command.text});
		});


		this.setState({
			todos: updatedTodos
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	clearCompleted() {
		var updatedTodos = this.state.todos.filter(function (todo) {
			return !todo.completed;
		});

		this.setState({
			todos: updatedTodos
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.todos', this.state.todos);
	}

	edit(id) {
		this.setState({
			editing: id
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.editing', this.editing);
	}

	show(nowShowing) {
		this.setState({
			nowShowing: nowShowing
		});

		this.store(LOCALSTORAGE_NAMESPACE + '.nowShowing', this.nowShowing);
	}

}

export default alt.createStore(todoStore, 'todoStore');