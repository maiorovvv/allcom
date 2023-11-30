import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ProductInterface from '../Products/types/ProductInCart';

import CrossIcon from '../../../../../img/svg/cross2.svg?react';

interface ProductProps {
	product: ProductInterface;
	handleRemoveFromCart: (id: number) => void;
}
interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

const ProductInCart: FC<ProductProps> = ({ product, handleRemoveFromCart }): JSX.Element => {
	const { title, price, image, color, weight, time = 604800 } = product;
	const { t } = useTranslation('productsInCart');

	const seconds = useRef(time);

	const calculateTimeLeft = (): TimeLeft => {
		if (seconds.current <= 0) {
			return {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0,
			};
		}

		const days = Math.floor(seconds.current / (24 * 60 * 60));
		const hours = Math.floor((seconds.current % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((seconds.current % (60 * 60)) / 60);
		const remainingSeconds = seconds.current % 60;

		return {
			days,
			hours,
			minutes,
			seconds: remainingSeconds,
		};
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

	useEffect(() => {
		if (seconds.current <= 0) return;

		const intervalId = setInterval(() => {
			seconds.current--;
			setTimeLeft(calculateTimeLeft);
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

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
						<div className="shopping_cart__timer">
							<div className="shopping_cart__timer--item_days">
								{timeLeft.days} {t('days')}
							</div>
							<div className="shopping_cart__timer--items">
								{timeLeft.hours > 9 ? `${timeLeft.hours}:` : `0${timeLeft.hours}:`}
							</div>
							<div className="shopping_cart__timer--items">
								{timeLeft.minutes > 9 ? `${timeLeft.minutes}:` : `0${timeLeft.minutes}:`}
							</div>
							<div className="shopping_cart__timer--items">
								{timeLeft.seconds > 9 ? timeLeft.seconds : `0${timeLeft.seconds}`}
							</div>
						</div>
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
			<td className="shopping_cart__table--body--price">
				<div className="shopping_cart__price">
					<span className="shopping_cart__price--total">{price} &euro;</span>
					<span className="shopping_cart__aufgeld">+ {t('tax')}</span>
				</div>
			</td>
		</>
	);
};

export default ProductInCart;
