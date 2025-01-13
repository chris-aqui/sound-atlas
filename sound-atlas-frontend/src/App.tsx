import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from '@/lib/theme-provider';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignUp } from '@clerk/clerk-react';
import './App.css';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const FavoritesPage = lazy(() => import('@/pages/Favorites/FavoritesPage'));
const ArtistDetails = lazy(() => import('@/pages/ArtistDetails/ArtistDetails'));
const Login = React.lazy(() => import('@/pages/Login'));

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key');
}

const App: React.FC = () => {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
				<Router>
					<Header />
					<Toaster />
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<Dashboard />} />
							<Route path="/artist/:artistId" element={<ArtistDetails />} />
							<Route path="/login/*" element={<Login />} />
							<Route path="/sign-up/*" element={<SignUp />} />
							<Route
								path="/favorites"
								element={
									<>
										<SignedIn>
											<FavoritesPage />
										</SignedIn>
										<SignedOut>
											<RedirectToSignIn />
										</SignedOut>
									</>
								}
							/>
						</Routes>
					</Suspense>
				</Router>
			</ClerkProvider>
		</ThemeProvider>
	);
};

export default App;
