import { FC, useState, useRef } from 'react';
import SearchIcon from '../../img/svg/search_icon.svg?react';

interface SearchProps {
	search: (value: string) => void;
	textPlaceholder: string;
}

const Search: FC<SearchProps> = ({ search, textPlaceholder }): JSX.Element => {
	const [searchValue, setSearchValue] = useState<string>('');
	const debounceTimer = useRef<NodeJS.Timeout | null>(null);

	const sanitizeUserInput = (value: string): string => {
		const sanitizedInput = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
		return sanitizedInput;
	};

	const debounce = (func: () => void, delay: number): void => {
		if (debounceTimer.current) {
			clearTimeout(debounceTimer.current);
		}
		debounceTimer.current = setTimeout(func, delay);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const inputValue = event.target.value;
		setSearchValue(inputValue);
		debounce(() => {
			const sanitizedValue = sanitizeUserInput(inputValue);
			search(sanitizedValue);
		}, 300);
	};

	return (
		<form>
			<div className="search__container">
				<input
					className="search__input"
					type="text"
					value={searchValue}
					placeholder={textPlaceholder}
					onChange={(event) => handleInputChange(event)}
				/>
				<SearchIcon className="search__icon" />
			</div>
		</form>
	);
};

export default Search;
