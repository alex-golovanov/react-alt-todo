import * as _ from 'lodash';
import alt from '../libs/alt';

class TodoActions {

	constructor() {
		this.generateActions(
			'toggleAll',
			'toggle',
			'destroy',
			'save',
			'clearCompleted',
			'edit',
			'show'
		);
	}

	addTodo(title) {
		return {
			id: _.uniqueId('todo-item-'),
			title: title,
			completed: false
		}
	}
}

const todoActions = alt.createActions(TodoActions);

export default todoActions;