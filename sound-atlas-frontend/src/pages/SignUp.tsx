import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<SignUp path="/sign-up" routing="path" signInUrl="/login" />
		</div>
	);
};

export default SignUpPage;
