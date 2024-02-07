export interface PageableInterface {
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
