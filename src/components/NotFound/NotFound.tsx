import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import image404 from '../../img/other/404.png';

import './NotFound.module.scss';

const NotFound: React.FC = (): JSX.Element => {
	const { t } = useTranslation('404-page');

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
							<h2 className="error__content--title">{t('content_title')}</h2>
							<p className="error__content--desc">{t('content_desc')}</p>
							<Link className="error__content--btn primary__btn" to="/">
								{t('link_back_to_home')}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
