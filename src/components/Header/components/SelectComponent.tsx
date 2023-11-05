import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

type Options = {
	value: string;
	label: string;
};

const SelectComponent: FC = (): JSX.Element => {
	const { t } = useTranslation('categories');

	const selectOptions: Options[] = [
		{ value: '1', label: t('category_1') },
		{ value: '2', label: t('category_2') },
		{ value: '3', label: t('category_3') },
		{ value: '4', label: t('category_4') },
		{ value: '5', label: t('category_5') },
		{ value: '6', label: t('category_6') },
		{ value: '7', label: t('category_7') },
		{ value: '8', label: t('category_8') },
		{ value: '9', label: t('category_9') },
	];
	const [selectedOptionState, setSelectedOption] = useState<Options | null>(selectOptions[0]);

	return (
		<Select
			options={selectOptions}
			value={selectedOptionState}
			onChange={(selectedOption) => setSelectedOption(selectedOption)}
			classNamePrefix="header_custom_select"
		/>
	);
};

export default SelectComponent;
