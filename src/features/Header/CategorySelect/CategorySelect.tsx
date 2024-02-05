import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { loadAllCategories } from '../../categories/CategoriesSlice';
import { getByCurrentLocale } from '../../categories/utilsCategories';
import i18next from 'i18next';

interface CategorySelectProps {
	handleCategoryChange: (value: number) => void;
}

type Option = {
	value: number;
	label: string;
};

const INITIAL_SELECTED_OPTION_INDEX = 0;
const PARENT_ID_MAIN_CATEGORIES = 0;

const CategorySelect: FC<CategorySelectProps> = ({ handleCategoryChange }): JSX.Element => {
	const locale = i18next.language;

	const { t } = useTranslation('categories');

	const mainCategories = useAppSelector((state: RootState) => state.categories.categories).filter(
		(item) => item.parentId === PARENT_ID_MAIN_CATEGORIES
	);
	const dispatch = useAppDispatch();

	const selectOptions: Option[] = [
		{ value: 0, label: t('default_select') },
		...(mainCategories?.map((category) => ({
			value: category.id,
			label: `${category[getByCurrentLocale(locale)]}`,
		})) || []),
	];

	const [selectedOptionState, setSelectedOption] = useState<Option | null>(
		selectOptions[INITIAL_SELECTED_OPTION_INDEX]
	);

	const filterOptions = (selectedValue = INITIAL_SELECTED_OPTION_INDEX): Option[] => {
		return selectOptions.filter(({ value }) => value === selectedValue);
	};

	const handleSelectChange = (selectedOption: Option | null): void => {
		setSelectedOption(selectedOption);
		if (handleCategoryChange && selectedOption) {
			handleCategoryChange(selectedOption.value);
		}
	};

	useEffect(() => {
		dispatch(loadAllCategories());
	}, []);

	return (
		<Select
			options={selectOptions}
			value={filterOptions(selectedOptionState?.value)}
			onChange={(selectedOption) => handleSelectChange(selectedOption)}
			classNamePrefix="header_custom_select"
			data-testid="selected-category"
		/>
	);
};

export default CategorySelect;
