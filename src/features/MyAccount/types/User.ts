import { PageableInterface } from '../../../types/PageableInterface';

export default interface UserDto {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	companyName: string;
	position: string;
	taxNumber: string;
	role: string;
	address: AddressDto;
	checked: boolean;
	blocked: boolean;
	error?: string;
}

export interface AddressDto {
	postIndex: string;
	city: string;
	street: string;
	houseNumber: string;
}

export interface UsersResponse {
	users: UserDto[];
	limit: number;
	total: number;
	skip: number;
}

export interface UserApiResponse {
	[x: string]: any;
	content: UserDto[];
	pageable: PageableInterface;
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
