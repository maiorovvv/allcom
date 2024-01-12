import { FC } from 'react';

import ArrowLeftIcon from '../../img/svg/arrow_pagination_left.svg?react';
import ArrowRightIcon from '../../img/svg/arrow_pagination_right.svg?react';

interface PaginationProps {
	loadContentForPage: (skip: number) => void;
	totalItems: number;
	skip: number;
	limit: number;
}

const FIRST_PAGE_NUMBER = 1;

const Pagination: FC<PaginationProps> = ({
	loadContentForPage,
	totalItems,
	skip,
	limit,
}): JSX.Element => {
	const quantityPages = Math.ceil(totalItems / limit);

	const pageNumbers = Array.from(
		{ length: quantityPages },
		(_, index) => FIRST_PAGE_NUMBER + index
	);

	const handleScrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const renderedPageButtons = pageNumbers.map((numberPage) => {
		const calculatedSkip = limit * numberPage - limit;

		return (
			<li className="page-item" key={numberPage}>
				<button
					className={calculatedSkip === skip ? 'page-link page-link__active' : 'page-link'}
					onClick={() => {
						loadContentForPage(calculatedSkip);
						handleScrollToTop();
					}}
					disabled={skip === calculatedSkip}
				>
					{numberPage}
				</button>
			</li>
		);
	});

	return (
		<div className="pagination-container">
			<ul className="pagination">
				<li className="page-item">
					<button
						className="page-link page-link--arrow"
						onClick={() => {
							loadContentForPage(skip - limit);
							handleScrollToTop();
						}}
						disabled={skip === 0}
					>
						<ArrowLeftIcon />
					</button>
				</li>
				{renderedPageButtons}
				<li className="page-item">
					<button
						className="page-link page-link--arrow"
						onClick={() => {
							loadContentForPage(skip + limit);
							handleScrollToTop();
						}}
						disabled={skip + limit >= totalItems}
					>
						<ArrowRightIcon />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
