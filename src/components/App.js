import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Header from './Header';
import FileUpload from '../containers/FileUpload';

const App = ({ children }) => (
	<div>
		<Header />
		<div className="main">
			{ children }
		</div>
		<FileUpload />
	</div>
)

export default App
