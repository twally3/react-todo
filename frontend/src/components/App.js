import React, { Component } from 'react';
import './App.sass';
import Todos from './Todos';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Todos />
			</div>
		);
	}
}

export default App;
