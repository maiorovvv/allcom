import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Arrow from '../../../img/svg/baner_arrow.svg?react';

const Baner: React.FC = (): JSX.Element => {
	const { t } = useTranslation('baner');
	return (
		<div className="baner--items baner_home3__slider--bg">
			<div className="container-fluid">
				<div className="baner--items__inner">
					<div className="row row-cols-1">
						<div className="col">
							<div className="baner__content">
								<p className="baner__content--desc desc1 mb-15">{t('view_auctions')}</p>
								<h2 className="baner__content--maintitle h1">
									{t('main_text_part1')} <br />
									{t('main_text_part2')}
								</h2>
								<NavLink className="baner_slider__btn primary__btn" to="/auction">
									{t('button')}
									<Arrow />
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Baner;
