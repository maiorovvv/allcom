import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { ProductData } from '../../../types/Product';
import Timer from '../../../components/Timer/Timer';
import Tooltip from '../../../components/Tooltip/Tooltip';

import HeartIcon from '../../../img/svg/heart.svg?react';
import EyeIcon from '../../../img/svg/eye.svg?react';

interface ProductProps {
	product: ProductData;
	setActiveWindow: (flag: boolean) => void;
	getProductById: (product_id: number) => void;
}

const Product: FC<ProductProps> = ({ product, setActiveWindow, getProductById }) => {
	const { t } = useTranslation('home_page');

	const { id, price, title, category, thumbnail, time } = product;

	return (
		<div className="home_page__items ">
			<div className="home_page__items--thumbnail">
				<img src={thumbnail} alt="product-img"></img>
				<NavLink
					className="home_page__btn"
					to="products/details/"
					onClick={() => getProductById(id)}
				>
					<span className="home_page__btn--bet_now">{t('bet_now')}</span>
				</NavLink>
				<ul className="home_page__items--action">
					<li className="home_page__items--action__list">
						<Tooltip text={t('add_to_wishlist')}>
							<button className="home_page__items--action__btn">
								<HeartIcon className="home_page__items--action__btn--svg" />
							</button>
						</Tooltip>
					</li>
					<li className="home_page__items--action__list">
						<Tooltip text={t('preview')}>
							<button
								className="home_page__items--action__btn"
								onClick={() => {
									setActiveWindow(true);
									getProductById(id);
								}}
							>
								<EyeIcon className="home_page__items--action__btn--svg" />
							</button>
						</Tooltip>
					</li>
				</ul>
			</div>
			<div className="home_page__items--content">
				<span className="home_page__items--content__subtitle">
					{t('category')}: {category}
				</span>
				<h3 className="home_page__items--content__title">{title}</h3>
				<div className="home_page__items--priceAndTimer">
					<span className="home_page__current__price">{price} &euro;</span>
					<Timer time={time} />
				</div>
			</div>
		</div>
	);
};

export default Product;
