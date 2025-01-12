import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<SignIn path="/login" routing="path" signUpUrl="/sign-up" />
		</div>
	);
};

export default Login;
