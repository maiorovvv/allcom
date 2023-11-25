import { useEffect, FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { loadProducts } from './productsInCartSlice';
import ProductInCart from './Product/ProductInCart';
import Spinner from '../../../../components/Spinner/Spinner';

const ShoppingCart: FC = (): JSX.Element => {
	const { t } = useTranslation('shopping_cart');

	const loading = useAppSelector((state: RootState) => state.productsInCart.loading);
	const productsInCart = useAppSelector((state: RootState) => state.productsInCart.productsInCart);
	const dispatch = useAppDispatch();

	const [totalSumInCart, setTotalSumInCart] = useState(0);
	const [note, setNote] = useState<string>('');

	const handleRemoveFromCart = (id: number): void => {
		fetch(`https://fakestoreapi.com/products/${id}`, {
			method: 'DELETE',
		}).then((res) => {
			if (res.ok) {
				dispatch(loadProducts());
			} else {
				alert(`Failed to delete product with id ${id}`);
			}
		});
	};

	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	useEffect(() => {
		setTotalSumInCart(
			productsInCart.reduce((acc, product) => {
				return acc + product.price;
			}, 0)
		);
	}, [productsInCart]);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<section className="cart__section section--padding">
			<div className="container">
				<div className="shopping_cart__section--inner">
					<form action="#">
						<div className="shopping_cart__table">
							<table className="shopping_cart__table--inner">
								<thead className="shopping_cart__table--header">
									<tr className="shopping_cart__table--header__items">
										<th className="shopping_cart__table--header__list">{t('product')}</th>
										<th className="shopping_cart__table--header__list text-center">{t('price')}</th>
									</tr>
								</thead>
								<tbody className="shopping_cart__table--body">
									{productsInCart.map((product) => (
										<tr className="shopping_cart__table--body__items" key={product.id}>
											<ProductInCart
												product={product}
												handleRemoveFromCart={handleRemoveFromCart}
											/>
										</tr>
									))}
								</tbody>
							</table>
							<div className="shopping_cart__continue__shopping d-flex justify-content-between">
								<NavLink className="shopping_cart__continue__shopping--link" to="/">
									{t('continue_shopping')}
								</NavLink>
								<a className="shopping_cart__continue__shopping--clear" href="shop.html">
									{t('clear_cart')}
								</a>
							</div>
						</div>
						<div className="shopping_cart__summary border-radius-10">
							<div className="shopping_cart__note mb-20">
								<h3 className="shopping_cart__note--title">{t('note')}</h3>
								<p className="shopping_cart__note--desc">{t('note_placeholder')}</p>
								<textarea
									className="shopping_cart__note--textarea border-radius-5"
									value={note}
									onChange={(e) => setNote(e.target.value)}
								></textarea>
							</div>
							<div className="shopping_cart__summary--total mb-20">
								<table className="shopping_cart__summary--total__table">
									<tbody>
										<tr className="shopping_cart__summary--total">
											<td className="shopping_cart__summary--total__title text-left">
												{t('subtotal')}
											</td>
											<td className="shopping_cart__summary--amount text-right">
												{totalSumInCart.toFixed(2)} &euro;
											</td>
										</tr>
										<tr className="shopping_cart__summary--total__list">
											<td className="shopping_cart__summary--total__title text-left">
												{t('grand_total')}
											</td>
											<td className="shopping_cart__summary--amount text-right">
												{(totalSumInCart + totalSumInCart * 0.2 * 0.2).toFixed(2)} &euro;
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="shopping_cart__summary--footer">
								<div className="shopping_cart__conditions text-center">
									<input
										className="shopping_cart__conditions--input"
										id="accept"
										type="checkbox"
									></input>
									<label className="shopping_cart__conditions--label">
										{t('agreement')}{' '}
										<a className="shopping_cart__conditions--link" href="privacy-policy.html">
											{t('privacy_policy')}
										</a>
									</label>
								</div>
								<button className="shopping_cart__summary--footer__btn primary__btn checkout">
									{t('checkout')}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
