const Todo = require('../models/todo');

async function findAll(ctx) {
	ctx.body = await Todo.find({});
}

async function create(ctx) {
	const newTodo = new Todo(ctx.request.body);
	ctx.body = await newTodo.save();
}

async function destroy(ctx) {
	const { id } = ctx.params;
	ctx.body = await Todo.findOneAndDelete({ _id: id });
}

async function update(ctx) {
	const { id } = ctx.params;
	const todo = await Todo.findById(id);
	todo.done = !todo.done;
	ctx.body = await todo.save();
}

module.exports = {
	findAll,
	create,
	destroy,
	update
};
