export default interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: {
		empty: boolean;
		sorted: boolean;
		unsorted: boolean;
	};
	offset: number;
	unpaged: boolean;
	paged: boolean;
}
