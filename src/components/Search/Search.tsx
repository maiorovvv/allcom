import { FC } from 'react';

import SearchIcon from '../../img/svg/search_icon.svg?react';

interface SearchProps {
	search: (value: string) => void;
	textPlaceholder: string;
}

const Search: FC<SearchProps> = ({ search, textPlaceholder }): JSX.Element => {
	const sanitizeUserInput = (value: string): string => {
		const sanitizedInput = value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

		return sanitizedInput;
	};

	return (
		<form>
			<div className="search__container">
				<input
					className="search__input"
					type="text"
					placeholder={textPlaceholder}
					onChange={(event) => {
						const sanitizedValue = sanitizeUserInput(event.target.value);
						search(sanitizedValue);
					}}
				/>
				<SearchIcon className="search__icon" />
			</div>
		</form>
	);
};

export default Search;
