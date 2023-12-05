import { FC, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ProductInterface from './Products/types/ProductInMyAuctions';

import CrossIcon from '../../../../img/svg/cross2.svg?react';
import { useAppDispatch } from '../../../../app/hooks';
import { deleteProduct } from './myAuctionsSlice';

interface ProductProps {
	product: ProductInterface;
}

interface TimeLeft {
	days: string;
	hours: string;
	minutes: string;
	secs: string;
}

const ProductInMyAuction: FC<ProductProps> = ({ product }): JSX.Element => {
	const dispatch = useAppDispatch();
	const { title, price, image, color, weight, time = 4004800 } = product;
	const { t } = useTranslation('product_in_my_auctions');

	const seconds = useRef(time);

	const calculateTimeLeft = (): TimeLeft => {
		if (seconds.current <= 0) {
			return {
				days: '0',
				hours: '0',
				minutes: '0',
				secs: '0',
			};
		}

		const days = Math.floor(seconds.current / (24 * 60 * 60));
		const hours = Math.floor((seconds.current % (24 * 60 * 60)) / (60 * 60));
		const minutes = Math.floor((seconds.current % (60 * 60)) / 60);
		const secs = seconds.current % 60;

		return {
			days: days.toString(),
			hours: hours > 9 ? `${hours}:` : `0${hours}:`,
			minutes: minutes > 9 ? `${minutes}:` : `0${minutes}:`,
			secs: secs > 9 ? `${secs}` : `0${secs}`,
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
			<td className="my_auctions__table--body__list">
				<div className="d-flex align-items-center">
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
							<img className="border-radius-5" src={image} alt="cart-product" />
						</a>
					</div>
					<div className="my_auctions__content">
						<div className="my_auctions__timer">
							<div className="my_auctions__timer--item_days">
								{timeLeft.days} {t('days', { count: +timeLeft.days })}
							</div>
							<div className="my_auctions__timer--items">{timeLeft.hours}</div>
							<div className="my_auctions__timer--items">{timeLeft.minutes}</div>
							<div className="my_auctions__timer--items">{timeLeft.secs}</div>
						</div>
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
					<span className="my_auctions__price--total">{price} &euro;</span>
					<span className="my_auctions__aufgeld">+ {t('tax')}</span>
				</div>
			</td>
		</>
	);
};

export default ProductInMyAuction;
