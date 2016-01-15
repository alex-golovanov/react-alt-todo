import React from 'react';
import classNames from 'classnames';

import commonConfig from '../configs/common';

import todoActions from '../actions/todo';

let filter = commonConfig.filter;

class Footer extends React.Component {
	render() {

		let activeTodoWord = this.props.count == 1 ? 'item' : 'items';
		let clearButton = null;
		let nowShowing = this.props.nowShowing;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button className="btn btn-danger btn-xs clear-completed" onClick={this.props.onClearCompleted}>Clear completed</button>
			);
		}
		
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<a onClick={this.props.onFilter.bind(this, filter.ALL_TODOS)} className={classNames({selected: nowShowing === filter.ALL_TODOS})}>All</a>
					</li>
					{' '}
					<li>
						<a onClick={this.props.onFilter.bind(this, filter.ACTIVE_TODOS)} className={classNames({selected: nowShowing === filter.ACTIVE_TODOS})}>Active</a>
					</li>
					{' '}
					<li>
						<a onClick={this.props.onFilter.bind(this, filter.COMPLETED_TODOS)} className={classNames({selected: nowShowing === filter.COMPLETED_TODOS})}>Completed</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
}

export default Footer;