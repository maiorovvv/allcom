import { FC, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import ProductInCart from './ProductInMyAuction';
import Spinner from '../../../Spinner/Spinner';
import { loadProducts } from './myAuctionsSlice';

const MyAuctions: FC = (): JSX.Element => {
	const { t } = useTranslation('my_auctions');

	const loading = useAppSelector((state: RootState) => state.myAuctions.loading);
	const productsInMyAuctions = useAppSelector(
		(state: RootState) => state.myAuctions.productsInMyAuctions
	);

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
		<section>
			<div className="container">
				<div className="my_auctions__section--inner">
					<form action="#">
						<div className="my_auctions__table">
							<table className="my_auctions__table--inner">
								<thead className="my_auctions__table--header">
									<tr className="my_auctions__table--header__items">
										<th className="my_auctions__table--header__list">{t('product')}</th>
										<th className="my_auctions__table--header__list text-right">{t('price')}</th>
									</tr>
								</thead>
								<tbody className="my_auctions__table--body">
									{productsInMyAuctions.map((product) => (
										<tr className="my_auctions__table--body__items" key={product.id}>
											<ProductInCart product={product} />
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="my_auctions__continue__shopping d-flex justify-content-between">
							<a className="my_auctions__continue__shopping--clear" href="shop.html">
								{t('clear_my_auctions')}
							</a>
							<NavLink className="my_auctions__continue__shopping--link" to="/">
								{t('continue_shopping')}
							</NavLink>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default MyAuctions;
