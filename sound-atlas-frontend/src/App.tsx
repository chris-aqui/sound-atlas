import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard/Dashboard';
import FavoritesPage from './pages/Favorites/FavoritesPage';

const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Router>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/favorites" element={<FavoritesPage />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
