import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard/Dashboard';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</Router>
	);
};

export default App;

// Apoll090!Arty
