import { FC, useEffect, useState } from 'react';
import Select from 'react-select';
import i18next from 'i18next';

import * as api from './api';
import ResponseCategoryDto from './types/ResponseCategoryDto';
import { useTranslation } from 'react-i18next';

interface CategorySelectProps {
	handleCategoryChange: (value: number) => void;
}

type Option = {
	value: number;
	label: string;
};

const INITIAL_SELECTED_OPTION_INDEX = 0;

const CategorySelect: FC<CategorySelectProps> = ({ handleCategoryChange }): JSX.Element => {
	const { t } = useTranslation('categories');
	const locale = i18next.language;
	const [categories, setCategories] = useState<ResponseCategoryDto[]>([]);

	const getByCurrentLocale = (): keyof ResponseCategoryDto => {
		switch (locale) {
			case 'ru':
				return 'nameRu';
			case 'de':
				return 'nameDe';
			default:
				return 'nameEn';
		}
	};

	const selectOptions: Option[] = [
		{ value: 0, label: t('default_select') },
		...(categories?.map((category) => ({
			value: category.id,
			label: `${category[getByCurrentLocale()]}`,
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
		const fetchData = async (): Promise<void> => {
			try {
				const res = await api.getAllCategoryByParent();
				setCategories(res);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
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
