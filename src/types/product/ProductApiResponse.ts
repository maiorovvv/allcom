import Pageable from '../pageable/Pageable';

export interface ContentProduct {
	product: ProductDto;
	storage: StorageDto;
}

export interface ProductDto {
	id: number;
	name: string;
	description: string;
	weight: number;
	color: string;
	categoryId: number;
	state?: string;
	photoLinks: string[];
}

export interface StorageDto {
	id: number;
	areaName: string;
	rackNumber: number;
	sectionNumber: number;
	shelveNumber: number;
}

export interface ProductApiResponse {
	content: [
		{
			product: ProductDto;
			storage: StorageDto;
		}
	];
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	size: number;
	number: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	first: boolean;
	numberOfElements: number;
	empty: boolean;
}

export interface ProductByIdDto {
	product: ProductDto;
	storage: StorageDto;
}
