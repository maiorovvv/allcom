import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import i18next from 'i18next';

import { ProductDto } from '../../../types/product/ProductApiResponse';
import { CategoriesDto } from '../../categories/types/CategoriesDto';
import { getNameCategory } from '../../categories/utilsCategories';
import { useAppDispatch } from '../../../app/hooks';
import { loadProduct } from '../../ProductDetails/productDetailsSlice';
import Timer from '../../../components/Timer/Timer';
import Tooltip from '../../../components/Tooltip/Tooltip';

import HeartIcon from '../../../img/svg/heart.svg?react';
import EyeIcon from '../../../img/svg/eye.svg?react';

interface ProductProps {
	product: ProductDto;
	categories: CategoriesDto[];
	setActiveWindow: (flag: boolean) => void;
	getProductById: (product_id: number) => void;
}

const Product: FC<ProductProps> = ({ product, setActiveWindow, getProductById, categories }) => {
	const { id, name, categoryId, photoLinks } = product;

	const locale = i18next.language;
	const { t } = useTranslation('home_page');

	const dispatch = useAppDispatch();

	const loadProductById = (): void => {
		dispatch(loadProduct(id));
	};

	return (
		<div className="home_page__items">
			<div className="home_page__items--thumbnail">
				<img src={`/${photoLinks[0]}`} alt="product-img"></img>
				<NavLink
					className="home_page__btn"
					to="products/details/"
					onClick={() => loadProductById()}
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
					{t('category')}: {getNameCategory(categories, categoryId, locale)}
				</span>
				<h3 className="home_page__items--content__title">{name}</h3>
				<div className="home_page__items--priceAndTimer">
					<span className="home_page__current__price">{299} &euro;</span>
					<Timer time={2000} />
				</div>
			</div>
		</div>
	);
};

export default Product;
