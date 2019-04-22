import React from 'react';

const Todo = ({ todo, id, onDelete, onToggle }) => (
	<div className="box todo-item level is-mobile">
		<div className="level-left">
			<label
				className={`level-item todo-description ${todo.done && 'completed'}`}
			>
				<input
					className="checkbox"
					type="checkbox"
					checked={todo.done}
					onChange={onToggle}
				/>
				<span>{todo.description}</span>
			</label>
		</div>
		<div className="level-right">
			<span className="delete level-item" onClick={onDelete}>
				Delete
			</span>
		</div>
	</div>
);

export default Todo;
