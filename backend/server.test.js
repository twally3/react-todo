/* eslint-disable no-undef */
const server = require('./server').callback();
const request = require('supertest');
const OLD_ENV = process.env;

jest.mock('mongoose', () => ({
	connect: jest.fn()
}));

jest.mock('./controllers/todos.js', () => ({
	findAll: ctx => {
		ctx.body = [];
	},
	create: ctx => {
		ctx.body = {};
	},
	update: ctx => {
		ctx.body = {};
	},
	destroy: ctx => {
		ctx.body = {};
	}
}));

beforeEach(() => {
	jest.resetModules();
	process.env = { ...OLD_ENV };
	delete process.env.NODE_ENV;
});

afterEach(() => {
	// server.close();
});

describe('GET /v1/todos', () => {
	test('should respond as expected', async () => {
		const response = await request(server).get('/v1/todos');

		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});

describe('POST /v1/todos', () => {
	test('should respond as expected', async () => {
		const response = await request(server)
			.post('/v1/todos')
			.send({ description: 'Test', done: false })
			.set('Content-Type', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});

describe('PUT /v1/todos/:id', () => {
	test('should respond as expected', async () => {
		const server = require('./server');
		const response = await request(server)
			.put('/v1/todos/5cbcfd42dc5d3934167f335d')
			.send()
			.set('Content-Type', 'application/json');

		await expect(response.status).toEqual(200);
		await expect(response.type).toEqual('application/json');
	});
});

describe('DELETE /v1/todos/:id', () => {
	test('should respond as expected', async () => {
		const response = await request(server)
			.delete('/v1/todos/5cbcfd42dc5d3934167f335d')
			.send();

		await expect(response.status).toEqual(200);
		await expect(response.type).toEqual('application/json');
	});
});
