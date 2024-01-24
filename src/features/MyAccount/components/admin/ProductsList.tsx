import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';
import { loadAllProducts } from '../../../HomePage/HomePageSlice';
import { getFoundUser, loadDefaultUsers } from '../../UserSlice';

import Spinner from '../../../../components/Spinner/Spinner';
import Pagination from '../../../../components/Pagination/Pagination';
import Tooltip from '../../../../components/Tooltip/Tooltip';
import Search from '../../../../components/Search/Search';
import Button from '../../../../components/Button/Button';

const ProductsList: FC = (): JSX.Element => {
	const { t } = useTranslation('products_list');

	const products = useAppSelector((state: RootState) => state.homePage.products);
	const loadingProducts = useAppSelector((state: RootState) => state.homePage.loadingAllProducts);
	const limit = useAppSelector((state: RootState) => state.homePage.limit);
	const skip = useAppSelector((state: RootState) => state.homePage.skip);
	const totalItems = useAppSelector((state: RootState) => state.homePage.totalItems);

	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(loadAllProducts(0));
	}, []);

	const loadProductsForPage = (skip_count: number): void => {
		dispatch(loadAllProducts(skip_count));
	};

	const search = (value: string): void => {
		if (value === '') {
			dispatch(loadDefaultUsers());
		} else {
			dispatch(getFoundUser(value));
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const edit = (product_id: number): void => {
		// dispatch(getProductById(product_id));
		navigate('/');
	};

	if (loadingProducts)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<div className="products_list__container">
			<Search search={search} textPlaceholder={t('search_placeholder')} />
			<table className="products_list__table">
				<thead>
					<tr>
						<th className="products_list__item">{t('name')}</th>
						<th className="products_list__item">{t('starting_price')}</th>
						<th className="products_list__item">{t('current_price')}</th>
						<th className="products_list__item">{t('start_date')}</th>
						<th className="products_list__item">{t('end_date')}</th>
						<th className="products_list__item">{t('created_at')}</th>
						<th className="products_list__item">{t('store')}</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map(({ id, title, price }) => (
							<tr className="products_list__info" key={id}>
								<td className="products_list__info--name">{title}</td>
								<td>{price} &euro;</td>
								<td>{price} &euro;</td>
								<td>22.02.2022</td>
								<td>30.02.2022</td>
								<td>12.03.2022</td>
								<td>AEF-234</td>
								<td>
									<Tooltip text={t('tooltip_edit')}>
										<Button
											btnValue={id}
											text={t('edit')}
											onClickBtn={() => edit(id)}
											widthBtn="10rem"
										/>
									</Tooltip>
								</td>
							</tr>
						))}
				</tbody>
			</table>
			<Pagination
				loadContentForPage={loadProductsForPage}
				limit={limit}
				skip={skip}
				totalItems={totalItems}
			/>
		</div>
	);
};

export default ProductsList;
