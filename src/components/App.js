import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Header from './Header';

const App = ({ children }) => (
	<div>
		<Header />
		<div className="main">
			{ children }
		</div>
	</div>
)

export default App
