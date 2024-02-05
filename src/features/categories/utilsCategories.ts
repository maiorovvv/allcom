import { CategoriesDto } from './types/CategoriesDto';

export const getByCurrentLocale = (locale: string): keyof CategoriesDto => {
	switch (locale) {
		case 'ru':
			return 'nameRu';
		case 'de':
			return 'nameDe';
		default:
			return 'nameEn';
	}
};

export const getNameCategory = (
	categories: CategoriesDto[],
	category_id: number,
	locale: string
): string => {
	const res = categories.find((item) => item.id === category_id);
	if (res) {
		return String(res[getByCurrentLocale(locale)]);
	}
	return '';
};
