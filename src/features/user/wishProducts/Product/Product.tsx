import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ProductInterface from '../Products/types/Product';

interface ProductProps {
	product: ProductInterface;
}

const Product: FC<ProductProps> = ({ product }): JSX.Element => {
	const { title, price, image, color, weight } = product;
	const { t } = useTranslation('products');

	return (
		<>
			<td className="cart__table--body__list">
				<div className="cart__product d-flex align-items-center">
					<button className="cart__remove--btn" aria-label="search button" type="button">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="16px"
							height="16px"
						>
							<path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
						</svg>
					</button>
					<div className="cart__thumbnail">
						<a href="products/details.html">
							<img className="border-radius-5" src={image} alt="cart-product" />
						</a>
					</div>
					<div className="cart__content">
						<h4 className="cart__content--title">
							<a href="products/details.html">{title}</a>
						</h4>
						<span className="cart__content--variant">
							{t('color')}: {color}
						</span>
						<span className="cart__content--variant">
							{t('weight')}: {weight} Kg
						</span>
					</div>
				</div>
			</td>
			<td className="cart__table--body__list">
				<span className="cart__price">{price} &euro;</span>
			</td>
			<td className="cart__table--body__list text-right">
				<a className="cart__wishlist--btn primary__btn" href="cart.html">
					{t('add_to_cart')}
				</a>
			</td>
		</>
	);
};

export default Product;
