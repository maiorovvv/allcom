export default interface ProductDetails {
	//https://dummyjson.com/products/1
	//next data
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
