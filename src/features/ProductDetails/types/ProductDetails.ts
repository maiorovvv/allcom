export default interface ProductDetails {
	id: number;
	title: string;
	brand: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	category: string;
	description: string;
	thumbnail: string;
	images: [];
}
