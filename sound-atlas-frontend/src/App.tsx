import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './App.css';
import Header from '@/components/Header';
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const FavoritesPage = lazy(() => import('@/pages/Favorites/FavoritesPage'));
const ArtistDetails = lazy(() => import('@/pages/ArtistDetails/ArtistDetails'));

const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Header />
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path="/" element={<Dashboard />} />
						<Route path="/favorites" element={<FavoritesPage />} />
						<Route path="/artist/:artistId" element={<ArtistDetails />} />
					</Routes>
				</Suspense>
			</Router>
		</ThemeProvider>
	);
};

export default App;
