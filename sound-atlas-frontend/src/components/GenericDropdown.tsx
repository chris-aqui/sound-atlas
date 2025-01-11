import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface GenericDropdownProps<T> {
	items: T[];
	selectedItem: T;
	onItemSelect: (item: T) => void;
	labelExtractor: (item: T) => string;
	title: string;
}

const GenericDropdown = <T,>({
	items,
	selectedItem,
	onItemSelect,
	labelExtractor,
	title,
}: GenericDropdownProps<T>) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="px-4 py-2 border rounded-md shadow-md bg-white-800 dark:bg-slate-800 w-1/4"
				aria-haspopup="menu"
				aria-expanded="false"
				aria-label={`Select ${title}`}
			>
				{title}: {labelExtractor(selectedItem)}
			</DropdownMenuTrigger>
			<DropdownMenuContent role="menu">
				{items.map((item, index) => (
					<DropdownMenuItem role="menuitem" key={index} onClick={() => onItemSelect(item)}>
						{labelExtractor(item)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default GenericDropdown;
