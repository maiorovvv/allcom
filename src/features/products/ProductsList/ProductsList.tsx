import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Pagination from '../../../components/Pagination/Pagination';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Search from '../../../components/Search/Search';
import Button from '../../../components/Button/Button';
import { loadAllProducts } from '../productsSlice';
import {
	selectLoadingAllProducts,
	selectNumberPage,
	selectProducts,
	selectTotalPages,
} from '../selectors';
import moment from 'moment';
import Spinner from '../../../components/Spinner/Spinner';

const ProductsList: FC = (): JSX.Element => {
	const { t } = useTranslation('products_list');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const products = useAppSelector(selectProducts);
	const totalPages = useAppSelector(selectTotalPages);
	const numberPage = useAppSelector(selectNumberPage);
	const loading = useAppSelector(selectLoadingAllProducts);

	useEffect(() => {
		dispatch(loadAllProducts({}));
	}, []);

	const loadProductsForPage = (page_number: number): void => {
		dispatch(loadAllProducts({ page_number }));
	};

	const search = (value: string): void => {
		dispatch(loadAllProducts({ search_query: value }));
	};

	const formattedDate = (date: string): string => {
		const createdAtMoment = moment(date);
		return createdAtMoment.format('YYYY-MM-DD HH:mm');
	};

	const edit = (product_id: number): void => {
		// dispatch(getProductById(product_id));
		navigate('/');
	};

	return (
		<div className="products_list__container">
			<Search search={search} textPlaceholder={t('search_placeholder')} />
			{loading ? (
				<div className="text-center min-vh-100 d-flex align-items-center justify-content-center">
					<Spinner />
				</div>
			) : (
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
							products.map(
								({
									id,
									name,
									lastCreatedAuction: { startPrice, startAt, currentPlannedEndAt, createdAt },
									storage: { area, rack, section, shelf },
								}) => (
									<tr className="products_list__info" key={id}>
										<td className="products_list__info--name">{name}</td>
										<td>{startPrice} &euro;</td>
										<td>{startPrice} &euro;</td>
										<td>{formattedDate(startAt)}</td>
										<td>{formattedDate(currentPlannedEndAt)}</td>
										<td>{formattedDate(createdAt)}</td>
										<td>
											{area}
											{rack}
											{section}
											{shelf}
										</td>
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
								)
							)}
					</tbody>
				</table>
			)}
			<Pagination
				loadContentForPage={loadProductsForPage}
				totalPages={totalPages}
				numberPage={numberPage}
			/>
		</div>
	);
};

export default ProductsList;
