import React from 'react';

const ListContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
			{children}
		</div>
	);
};

export default ListContent;
