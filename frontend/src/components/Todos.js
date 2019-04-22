import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, fetchTodos } from '../actions/todos';
import Todo from './Todo';

class Todos extends Component {
	state = { newTodo: '' };

	componentDidMount() {
		this.props.fetchTodos();
	}

	addTodo(event) {
		event.preventDefault(); // Prevent form from reloading page
		const { newTodo } = this.state;

		if (newTodo) {
			const todo = { description: newTodo, done: false };
			this.props.addTodo(todo);
			this.setState({ newTodo: '' });
		}
	}

	render() {
		const { newTodo } = this.state;
		const {
			todos,
			isLoading,
			isSaving,
			error,
			deleteTodo,
			toggleTodo
		} = this.props;

		const total = todos.length;
		const complete = todos.filter(todo => todo.done).length;
		const incomplete = todos.filter(todo => !todo.done).length;

		return (
			<section className="section full-column">
				<h1 className="title bg-text-color">Crazy Todo</h1>
				<div className="error">{error}</div>

				<form className="form" onSubmit={this.addTodo.bind(this)}>
					<div
						className="field has-addons"
						style={{ justifyContent: 'center' }}
					>
						<div className="control">
							<input
								className="input"
								value={newTodo}
								placeholder="New todo"
								onChange={e => this.setState({ newTodo: e.target.value })}
							/>
						</div>

						<div className="control">
							<button
								className={`button is-primary bold ${(isLoading || isSaving) &&
									'is-loading'}`}
								disabled={isLoading || isSaving}
							>
								+
							</button>
						</div>
					</div>
				</form>

				<div className="container todo-list">
					{todos.map(todo => (
						<Todo
							key={todo._id}
							id={todo._id}
							todo={todo}
							onDelete={() => deleteTodo(todo._id)}
							onToggle={() => toggleTodo(todo._id)}
						/>
					))}
					<div className="bg-text-color">
						<p><b>Total: {total}</b></p>
						<p><b>Complete: {complete}</b></p>
						<p><b>Incomplete: {incomplete}</b></p>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos.items,
		isLoading: state.todos.loading,
		isSaving: state.todos.saving,
		error: state.todos.error
	};
};

const mapDispatchToProps = {
	addTodo,
	toggleTodo,
	deleteTodo,
	fetchTodos
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Todos);
