import React from 'react';
import { ModeToggle } from './mode-toggle';
import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UserClerkAuth: React.FC = () => {
	return (
		<div>
			<SignedIn>
				<SignOutButton>
					<Button className="bg-indigo-600 text-white px-4 py-1 rounded">Sign Out</Button>
				</SignOutButton>
			</SignedIn>
			<SignedOut>
				<a href="/login" className="bg-indigo-600 text-white px-4 py-1 rounded">
					Log In
				</a>
			</SignedOut>
		</div>
	);
};

const Header: React.FC = () => {
	return (
		<div className="w-full flex flex-wrap sm:flex-nowrap justify-center  sm:items-center ">
			<div className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
				<a className="no-underline" href="/">
					🎵 Sound Atlas
				</a>
			</div>
			<div className="flex sm:items-center sm:justify-end gap-8 basis-full mt-6 sm:mt-0">
				<Link to="/favorites" className="text-indigo-600 basis-10/12 sm:basis-0">
					Favorites
				</Link>
				<UserClerkAuth />
				<ModeToggle />
			</div>
		</div>
	);
};

export default Header;
