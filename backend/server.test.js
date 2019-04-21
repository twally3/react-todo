/* eslint-disable no-undef */
const request = require('supertest');
const OLD_ENV = process.env;

beforeEach(() => {
	jest.resetModules();
	process.env = { ...OLD_ENV };
	delete process.env.NODE_ENV;
});

describe('GET /v1/todos', () => {
	test('should respond as expected', async () => {
		process.env.NODE_ENV = 'development';
		process.env.DATABASE =
			'mongodb+srv://test:LGDBXHPoCOdBOFHG@cluster0-ltuj9.mongodb.net/test?retryWrites=true';

		const server = require('./server');
		const response = await request(server.callback()).get('/v1/todos');

		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});

describe('POST /v1/todos', () => {
	test('should respond as expected', async () => {
		process.env.NODE_ENV = 'development';
		process.env.DATABASE =
			'mongodb+srv://test:LGDBXHPoCOdBOFHG@cluster0-ltuj9.mongodb.net/test?retryWrites=true';

		const server = require('./server');
		const response = await request(server.callback())
			.post('/v1/todos')
			.send({ description: 'Test', done: false })
			.set('Content-Type', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});

describe('PUT /v1/todos/:id', () => {
	test('should respond as expected', async () => {
		process.env.NODE_ENV = 'development';
		process.env.DATABASE =
			'mongodb+srv://test:LGDBXHPoCOdBOFHG@cluster0-ltuj9.mongodb.net/test?retryWrites=true';

		const server = require('./server');
		const response = await request(server.callback())
			.put('/v1/todos/5cbcfd42dc5d3934167f335d')
			.send()
			.set('Content-Type', 'application/json');

		expect(response.status).toEqual(200);
		expect(response.type).toEqual('application/json');
	});
});
