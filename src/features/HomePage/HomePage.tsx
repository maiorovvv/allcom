import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loadProducts } from './HomePageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import Spinner from '../../components/Spinner/Spinner';
import Product from './components/Product';
import ModalWindowProduct from '../../components/ModalWindowProduct/ModalWindowProduct';
import Pagination from '../../components/Pagination/Pagination';

const HomePage: FC = (): JSX.Element => {
	const { t } = useTranslation('home_page');

	const [activeWindow, setActiveWindow] = useState<boolean>(false);

	const products = useAppSelector((state: RootState) => state.homePage.products);
	const loadingAllProducts = useAppSelector(
		(state: RootState) => state.homePage.loadingAllProducts
	);
	const dispatch = useAppDispatch();

	const loadContentForPage = (skip: number): void => {
		dispatch(loadProducts(skip));
	};

	useEffect(() => {
		dispatch(loadProducts(0));
	}, []);

	if (loadingAllProducts) {
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="home_page__container">
			<div className="container-fluid">
				<div className="home_page__title">
					<h2 className="home_page__title--h2">{t('auctions')}</h2>
					<div className="home_page__title--line"></div>
				</div>
				<div className="home_page__section--inner">
					<div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
						{products.map((product) => (
							<Product product={product} key={product.id} setActiveWindow={setActiveWindow} />
						))}
					</div>
					<Pagination loadContentForPage={loadContentForPage} />
				</div>
			</div>
			<ModalWindowProduct activeWindow={activeWindow} setActiveWindow={setActiveWindow} />
		</div>
	);
};

export default HomePage;
