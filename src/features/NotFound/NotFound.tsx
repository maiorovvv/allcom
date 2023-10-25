import * as React from 'react';
import { Link } from 'react-router-dom';
import image404 from '../../img/other/404.png';
import './NotFound.module.scss';

const NotFound: React.FC = (): JSX.Element => {
	return (
		<section className="error__section section--padding">
			<div className="container">
				<div className="row row-cols-1">
					<div className="col">
						<div className="error__content text-center">
							<img
								className="error__content--img mb-50"
								src={image404}
								alt="404 error / page not found"
							/>
							<h2 className="error__content--title">Opps! We did not find this page</h2>
							<p className="error__content--desc">But you can return to the main page</p>
							<Link className="error__content--btn primary__btn" to="/index">
								Back To Home
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
