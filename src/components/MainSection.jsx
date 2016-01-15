import React from 'react';
import TodoItem from './TodoItem.jsx';
import Footer from './Footer.jsx';
import todoStore from '../stores/todo';
import todoActions from '../actions/todo';
import commonConfig from '../configs/common';

let {keys, filter} = commonConfig;

class MainSection extends React.Component {

  constructor(props) {
    super(props);
    this.state = todoStore.getState();
  }

  componentDidMount(){
    todoStore.listen((state) => this.setState(state));
  }

  componentWillUnmount(){
    todoStore.unlisten((state) => this.setState(state));
  }
  
	handleChange(event) {
		this.setState({newTodo: event.target.value});
	}

	onStoreChange(state) {
		this.setState(state);
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== keys.ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (val) {
			this.setState({newTodo: ''});

			todoActions.addTodo(val);
		}
	}

	toggleAll(event) {
		var checked = event.target.checked;
		todoActions.toggleAll(checked);
	}

	toggle(todoToToggle) {
		todoActions.toggle(todoToToggle);
	}

	destroy(todo) {
		todoActions.destroy(todo);
	}

	edit(todo) {
		todoActions.edit(todo.id);
	}

	save(todoToSave, text) {
		todoActions.save({
			todoToSave: todoToSave,
			text: text
		});

		todoActions.edit(null);
	}

	cancel() {
		todoActions.edit(null);
	}

	clearCompleted() {
		todoActions.clearCompleted();
	}

	filter( type ){
		todoActions.show(type);
	}


	render () {
		var footer = null;
		var main = null;
		var todos = this.state.todos;

		var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case filter.ACTIVE_TODOS:
				return !todo.completed;
			case filter.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this)

		var todoItems = shownTodos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel}
				/>
			)
		}, this)

		var activeTodoCount = todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0)


		var completedCount = todos.length - activeTodoCount;

		if (activeTodoCount || completedCount) {
			footer =
				<Footer
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
					onFilter={this.filter}
				/>
		}
		
		if (todos.length) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll}
						checked={activeTodoCount === 0}
					/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			)
		}

		return (
			<div id="main-container" className="center-block">
				<header className="header">
					<h1>Todos</h1>
					<input
						ref="newField"
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown.bind(this)}
						onChange={this.handleChange.bind(this)}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		)
	}


  
}

export default MainSection;