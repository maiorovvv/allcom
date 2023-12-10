import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import ProductInterface from './Products/types/ProductInMyAuctions';
import CrossIcon from '../../../../img/svg/cross2.svg?react';
import { useAppDispatch } from '../../../../app/hooks';
import { deleteProduct } from './myAuctionsSlice';
import Timer from '../../../Timer/Timer';

interface ProductProps {
	product: ProductInterface;
}

const ProductInMyAuction: FC<ProductProps> = ({ product }): JSX.Element => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation('product_in_my_auctions');

	const { title, price, image, color, weight, time } = product;

	return (
		<>
			<td className="my_auctions__table--body__list">
				<div className="my_auctions__table--container">
					<button
						className="my_auctions__remove--btn"
						aria-label="search button"
						type="button"
						onClick={() => dispatch(deleteProduct(product.id))}
					>
						<CrossIcon />
					</button>
					<div className="my_auctions__thumbnail">
						<a href="product-details.html">
							<img className="border-radius-5" src={image} alt="product" />
						</a>
					</div>
					<div className="my_auctions__content">
						<Timer time={time} />
						<h4 className="my_auctions__content--title">
							<a href="product-details.html">{title}</a>
						</h4>
						<span className="my_auctions__content--variant">
							{t('color')}: {color}
						</span>
						<span className="my_auctions__content--variant">
							{t('weight')}: {weight} Kg
						</span>
					</div>
				</div>
			</td>
			<td className="my_auctions__table--body--price">
				<div className="my_auctions__price">
					<div className="my_auctions__price--total">{price} &euro;</div>
					<div className="my_auctions__aufgeld">+ {t('tax')}</div>
				</div>
			</td>
		</>
	);
};

export default ProductInMyAuction;
