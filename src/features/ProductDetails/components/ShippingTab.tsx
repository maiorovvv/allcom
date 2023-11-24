import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import imageShipping from '../../../img/other/shipping.png';
import imagePayment from '../../../img/other/payment.png';
import imageReturn from '../../../img/other/return.png';
import imageSupport from '../../../img/other/support.png';

const ShippingTab: React.FC = (): JSX.Element => {
	const { t } = useTranslation('ProductDetails');
	return (
		<section className="shipping__section2 shipping__style3 section--padding pt-0">
			<div className="container">
				<div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
					<NavLink to="/shipping">
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src={imageShipping} alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">{t('shipping')}</h2>
								<p className="shipping__items2--content__desc"></p>
							</div>
						</div>
					</NavLink>
					<NavLink to="/payment">
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src={imagePayment} alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">{t('payment')}</h2>
								<p className="shipping__items2--content__desc"></p>
							</div>
						</div>
					</NavLink>
					<NavLink to="/return">
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src={imageReturn} alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">{t('return')}</h2>
								<p className="shipping__items2--content__desc"></p>
							</div>
						</div>
					</NavLink>
					<NavLink to="/support">
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src={imageSupport} alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">{t('support')}</h2>
								<p className="shipping__items2--content__desc"></p>
							</div>
						</div>
					</NavLink>
				</div>
			</div>
		</section>
	);
};

export default ShippingTab;
