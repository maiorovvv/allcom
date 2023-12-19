export interface ProductData {
	id: number;
	title: string;
	description: string;
	price: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	time: number;
	color?: string;
	weight?: string;
}

export interface ProductResponse {
	products: ProductData[];
	total: number;
	skip: number;
	limit: number;
}
