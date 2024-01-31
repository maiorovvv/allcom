import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import Timer from '../../../components/Timer/Timer';
import Tooltip from '../../../components/Tooltip/Tooltip';

import HeartIcon from '../../../img/svg/heart.svg?react';
import EyeIcon from '../../../img/svg/eye.svg?react';
import { ProductDto } from '../../../types/product/ProductApiResponse';

interface ProductProps {
	product: ProductDto;
	setActiveWindow: (flag: boolean) => void;
	getProductById: (product_id: number) => void;
}

const Product: FC<ProductProps> = ({ product, setActiveWindow, getProductById }) => {
	const { t } = useTranslation('home_page');

	const { id, name, categoryId, photoLinks } = product;

	return (
		<div className="home_page__items">
			<div className="home_page__items--thumbnail">
				<img src="/images/1/94ba8869-49a3-43f1-ad2e-f36c384ffdf7.jpg" alt="product-img"></img>
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
					{t('category')}: {categoryId}
				</span>
				<h3 className="home_page__items--content__title">{name}</h3>
				<div className="home_page__items--priceAndTimer">
					{/* <span className="home_page__current__price">{startPrice} &euro;</span>
					<Timer time={time = 2000} /> */}
				</div>
			</div>
		</div>
	);
};

export default Product;
