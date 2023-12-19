import { FC } from 'react';

const Pagination: FC = () => {
	return (
		<ul className="pagination">
			<li className="page-item disabled">
				<button className="page-link">Previous</button>
			</li>
			<li className="page-item">
				<button className="page-link">1</button>
			</li>
			<li className="page-item">
				<button className="page-link">2</button>
			</li>
			<li className="page-item">
				<button className="page-link">3</button>
			</li>
			<li className="page-item">
				<button className="page-link">Next</button>
			</li>
		</ul>
	);
};

export default Pagination;
