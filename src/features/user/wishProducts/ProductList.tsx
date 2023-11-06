import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { loadProducts } from './productsSlice';
import Product from './Product/Product';
import Spinner from '../../../components/Spinner/Spinner';

const ProductList = (): JSX.Element => {
	const { t } = useTranslation('products');

	const loading = useAppSelector((state: RootState) => state.userProducts.loading);
	const products = useAppSelector((state: RootState) => state.userProducts.products);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<section className="cart__section section--padding">
			<div className="container">
				<div className="cart__section--inner">
					<form action="#">
						<h2 className="cart__title mb-40">{t('wishlist')}</h2>
						<div className="cart__table">
							<table className="cart__table--inner">
								<thead className="cart__table--header">
									<tr className="cart__table--header__items">
										<th className="cart__table--header__list">{t('product')}</th>
										<th className="cart__table--header__list">{t('price')}</th>
										<th className="cart__table--header__list text-right">{t('add_to_cart')}</th>
									</tr>
								</thead>
								<tbody className="cart__table--body">
									{products.map((product) => (
										<tr className="cart__table--body__items" key={product.id}>
											<Product product={product} />
										</tr>
									))}
								</tbody>
							</table>
							<div className="cart__continue__shopping d-flex justify-content-between">
								<a className="cart__continue__shopping--link" href="index.html">
									{t('continue_shopping')}
								</a>
								<a className="cart__continue__shopping--clear" href="shop.html">
									{t('view_all_products')}
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default ProductList;
