import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '../../img/svg/search_icon.svg?react';

import '../../assets/scss/elements/_search.scss';

interface SearchProps {
	search: (value: string) => void;
}

const Search: FC<SearchProps> = ({ search }): JSX.Element => {
	const { t } = useTranslation('search');

	return (
		<form>
			<div className="search__container">
				<input
					className="search__input"
					type="text"
					placeholder={t('placeholder')}
					onChange={(event) => {
						search(event.target.value);
					}}
				/>
				<SearchIcon className="search__icon" />
			</div>
		</form>
	);
};

export default Search;
