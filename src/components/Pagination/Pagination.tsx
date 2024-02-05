import { FC } from 'react';

import ArrowLeftIcon from '../../img/svg/arrow_pagination_left.svg?react';
import ArrowRightIcon from '../../img/svg/arrow_pagination_right.svg?react';

interface PaginationProps {
	loadContentForPage: (number_page: number) => void;
	totalPages: number;
	numberPage: number;
}

const FRONTEND_FIRST_PAGE_NUMBER = 1;
const BACKEND_FIRST_PAGE_NUMBER = 0;
const BACKEND_PAGE_OFFSET = 1;

const Pagination: FC<PaginationProps> = ({
	loadContentForPage,
	totalPages,
	numberPage,
}): JSX.Element => {
	const frontendPageNumber = numberPage + BACKEND_PAGE_OFFSET;
	const previousFrontendPageNumber = numberPage - 1;
	const nextFrontendPageNumber = numberPage + 1;

	const arrPageNumbers = [];

	for (let i = FRONTEND_FIRST_PAGE_NUMBER; i <= totalPages; i++) {
		arrPageNumbers.push(i);
	}

	const handleScrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const renderedPageButtons = arrPageNumbers.map((item) => {
		return (
			<li className="page-item" key={item}>
				<button
					className={frontendPageNumber === item ? 'page-link page-link__active' : 'page-link'}
					onClick={() => {
						loadContentForPage(item - BACKEND_PAGE_OFFSET);
						handleScrollToTop();
					}}
					disabled={frontendPageNumber === item}
				>
					{item}
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
							loadContentForPage(previousFrontendPageNumber);
							handleScrollToTop();
						}}
						disabled={numberPage === BACKEND_FIRST_PAGE_NUMBER}
					>
						<ArrowLeftIcon />
					</button>
				</li>
				{renderedPageButtons}
				<li className="page-item">
					<button
						className="page-link page-link--arrow"
						onClick={() => {
							loadContentForPage(nextFrontendPageNumber);
							handleScrollToTop();
						}}
						disabled={frontendPageNumber === totalPages}
					>
						<ArrowRightIcon />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
