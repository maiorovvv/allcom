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
		<section>
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
						</div>
						<div className="shopping_cart__continue__shopping d-flex justify-content-between">
							<a className="shopping_cart__continue__shopping--clear" href="shop.html">
								{t('clear_cart')}
							</a>
							<NavLink className="shopping_cart__continue__shopping--link" to="/">
								{t('continue_shopping')}
							</NavLink>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ShoppingCart;
