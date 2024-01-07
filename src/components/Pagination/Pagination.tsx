import { FC } from 'react';

import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';

import ArrowLeftIcon from '../../img/svg/arrow_pagination_left.svg?react';
import ArrowRightIcon from '../../img/svg/arrow_pagination_right.svg?react';

interface PaginationProps {
	loadContentForPage: (skip: number) => void;
}

const Pagination: FC<PaginationProps> = ({ loadContentForPage }): JSX.Element => {
	const totalItems = useAppSelector((state: RootState) => state.homePage.totalItems);
	const skip = useAppSelector((state: RootState) => state.homePage.skip);
	const ITEMS_PER_PAGE = useAppSelector((state: RootState) => state.homePage.limit);

	const FIRST_PAGE_NUMBER = 1;
	const QUANTITY_PAGES = Math.ceil(totalItems / ITEMS_PER_PAGE);

	const pageNumbers = Array.from(
		{ length: QUANTITY_PAGES },
		(_, index) => FIRST_PAGE_NUMBER + index
	);

	const renderedPageButtons = pageNumbers.map((numberPage) => {
		const calculatedSkip = ITEMS_PER_PAGE * numberPage - ITEMS_PER_PAGE;

		return (
			<li className="page-item" key={numberPage}>
				<button
					className={calculatedSkip === skip ? 'page-link page-link__active' : 'page-link'}
					onClick={() => {
						loadContentForPage(calculatedSkip);
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
							loadContentForPage(skip - ITEMS_PER_PAGE);
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
							loadContentForPage(skip + ITEMS_PER_PAGE);
						}}
						disabled={skip + ITEMS_PER_PAGE >= totalItems}
					>
						<ArrowRightIcon />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
