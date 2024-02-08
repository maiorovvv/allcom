export interface ProductDto {
	id: number;
	name: string;
	description: string;
	weight: number;
	color: string;
	categoryId: number;
	state?: string;
	imageLinks: string[];
	lastCreatedAuction: LastCreatedAuctionDto;
	storage: StorageDto;
	error?: string;
}

export interface LastCreatedAuctionDto {
	id: number;
	startPrice: number;
	startAt: string;
	plannedEndAt?: string;
	currentPlannedEndAt: string;
	actualEndAt?: string;
	state: string;
	productId?: number;
	winnerId?: number;
	lastBetAmount: number;
	updatedAt?: string;
	createdAt: string;
}

export interface StorageDto {
	id: number;
	area: string;
	rack: number;
	section: number;
	shelf: number;
	productId: number;
}

export interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	offset: number;
	paged: true;
	unpaged: false;
}

export interface ProductApiResponse {
	content: ProductDto[];
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
