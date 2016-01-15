import alt from '../libs/alt';

var uuid = function () {
	var i, random;
	var uuid = '';

	for (i = 0; i < 32; i++) {
		random = Math.random() * 16 | 0;
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			uuid += '-';
		}
		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
			.toString(16);
	}

	return uuid;
}

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
			id: uuid(),
			title: title,
			completed: false
		}
	}
}

const todoActions = alt.createActions(TodoActions);

export default todoActions;