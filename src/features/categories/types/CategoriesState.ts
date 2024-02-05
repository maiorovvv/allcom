import { CategoriesDto } from './CategoriesDto';

export interface CategoryState {
	categories: CategoriesDto[];
	error?: string;
}
