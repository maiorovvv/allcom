import { RootState } from '../../app/store';
import { CategoriesDto } from './types/CategoriesDto';

export const selectCategories = (state: RootState): CategoriesDto[] => state.categories.categories;
