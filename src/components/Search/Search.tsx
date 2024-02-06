import { FC, useState } from 'react';

import SearchIcon from '../../img/svg/search_icon.svg?react';

interface SearchProps {
	search: (value: string) => void;
	textPlaceholder: string;
}

const Search: FC<SearchProps> = ({ search, textPlaceholder }): JSX.Element => {
	const [searchValue, setSearchValue] = useState<string>('');

	const sanitizeUserInput = (value: string): string => {
		const sanitizedInput = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

		return sanitizedInput;
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const inputValue = event.target.value;
		setSearchValue(inputValue);

		setTimeout(() => {
			const sanitizedValue = sanitizeUserInput(inputValue);
			search(sanitizedValue);
		}, 500);
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
