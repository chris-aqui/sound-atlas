/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		console.error('Error caught by ErrorBoundary:', error);
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="container mx-auto mt-5 p-4">
					<h1>Something went wrong.</h1>
					<button
						onClick={() => this.setState({ hasError: false })}
						className="text-indigo-500 hover:text-indigo-600"
					>
						Try again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
