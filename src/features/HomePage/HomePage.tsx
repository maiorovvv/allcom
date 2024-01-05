import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { loadProductById, loadProducts } from './HomePageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import Spinner from '../../components/Spinner/Spinner';
import Product from './components/Product';
import Pagination from '../../components/Pagination/Pagination';
import ModalWindowProduct from './components/ModalWindowProduct';
import Poster from './components/Poster/Poster';

const HomePage: FC = (): JSX.Element => {
	const { t } = useTranslation('home_page');

	const [activeWindow, setActiveWindow] = useState<boolean>(false);

	const products = useAppSelector((state: RootState) => state.homePage.products);
	const loadingAllProducts = useAppSelector(
		(state: RootState) => state.homePage.loadingAllProducts
	);
	const dispatch = useAppDispatch();

	const getProductById = (product_id: number): void => {
		dispatch(loadProductById(product_id));
	};

	const loadContentForPage = (skip: number): void => {
		dispatch(loadProducts(skip));
	};

	useEffect(() => {
		dispatch(loadProducts(0));
	}, []);

	if (loadingAllProducts) {
		return (
			<div className="text-center min-vh-100 d-flex align-items-center justify-content-center">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="home_page__container">
			<Poster />
			<div className="container-fluid">
				<div className="home_page__title">
					<h2 className="home_page__title--h2">{t('auctions')}</h2>
					<div className="home_page__title--line"></div>
				</div>
				<div className="home_page__section--inner">
					<div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
						{products.map((product) => (
							<Product
								product={product}
								key={product.id}
								setActiveWindow={setActiveWindow}
								getProductById={getProductById}
							/>
						))}
					</div>
					<Pagination loadContentForPage={loadContentForPage} />
				</div>
			</div>
			<ModalWindowProduct
				activeWindow={activeWindow}
				setActiveWindow={setActiveWindow}
				getProductById={getProductById}
			/>
		</div>
	);
};

export default HomePage;
