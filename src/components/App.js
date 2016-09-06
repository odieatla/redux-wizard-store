import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import Header from '../components/Header';
import FileUpload from '../containers/FileUpload';

require('../stylesheets/ubnt/base/fonts/icons/style.scss')
require('../stylesheets/style.scss')

const App = ({ children }) => (
	<div className="comWrapper">
		<Header />
		<div className="comContent comContent--comfy">
			{ children }
		</div>
		<FileUpload />
	</div>
)

export default App
