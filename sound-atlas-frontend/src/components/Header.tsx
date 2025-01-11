import React from 'react';
import { ModeToggle } from './mode-toggle';

const Header: React.FC = () => {
	// bg-white-800 dark:bg-slate-800
	// todo add auth signin and signout buttons
	return (
		<div className="w-full flex items-center justify-between">
			<h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
				<a className="no-underline" href="/">
					🎵 Sound Atlas
				</a>
			</h1>
			<ModeToggle />
		</div>
	);
};

export default Header;
