import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ProductInterface from '../Products/types/ProductInCart';

import CrossIcon from '../../../../../img/svg/cross2.svg?react';

interface ProductProps {
	product: ProductInterface;
	handleRemoveFromCart: (id: number) => void;
}

const ProductInCart: FC<ProductProps> = ({ product, handleRemoveFromCart }): JSX.Element => {
	const { title, price, image, color, weight } = product;
	const { t } = useTranslation('productsInCart');

	return (
		<>
			<td className="shopping_cart__table--body__list">
				<div className="d-flex align-items-center">
					<button
						onClick={() => {
							handleRemoveFromCart(product.id);
						}}
						className="shopping_cart__remove--btn"
						aria-label="search button"
						type="button"
					>
						<CrossIcon />
					</button>
					<div className="shopping_cart__thumbnail">
						<a href="product-details.html">
							<img className="border-radius-5" src={image} alt="cart-product" />
						</a>
					</div>
					<div className="shopping_cart__content">
						<h4 className="shopping_cart__content--title">
							<a href="product-details.html">{title}</a>
						</h4>
						<span className="shopping_cart__content--variant">
							{t('color')}: {color}
						</span>
						<span className="shopping_cart__content--variant">
							{t('weight')}: {weight} Kg
						</span>
					</div>
				</div>
			</td>
			<td className="shopping_cart__table--body__list">
				<span className="shopping_cart__price">{price} &euro;</span>
			</td>
		</>
	);
};

export default ProductInCart;
