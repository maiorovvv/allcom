import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { filterProductById, loadAllProducts } from './HomePageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import Spinner from '../../components/Spinner/Spinner';
import Product from './components/Product';
import Pagination from '../../components/Pagination/Pagination';
import Poster from './components/Poster/Poster';
import ModalWindowProduct from './components/ModalWindow/ModalWindowProduct';

const HomePage: FC = (): JSX.Element => {
	const { t } = useTranslation('home_page');

	const [activeWindow, setActiveWindow] = useState<boolean>(false);

	const products = useAppSelector((state: RootState) => state.homePage.products);
	const arrProducts = products.map((item) => item.product);
	const loadingAllProducts = useAppSelector(
		(state: RootState) => state.homePage.loadingAllProducts
	);

	const dispatch = useAppDispatch();

	const getProductById = (product_id: number): void => {
		dispatch(filterProductById(product_id));
	};

	const loadContentForPage = (page_number: number): void => {
		dispatch(loadAllProducts(page_number));
	};

	useEffect(() => {
		dispatch(loadAllProducts(1));
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
			{/* <Poster /> */}
			<div className="container-fluid">
				<div className="home_page__title">
					<h2 className="home_page__title--h2">{t('auctions')}</h2>
					<div className="home_page__title--line"></div>
				</div>
				<div className="home_page__section--inner">
					<div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2">
						{arrProducts &&
							arrProducts.map((item) => (
								<Product
									key={item.id}
									product={item}
									setActiveWindow={setActiveWindow}
									getProductById={getProductById}
								/>
							))}
					</div>
					{/* <Pagination
						loadContentForPage={loadContentForPage}
						totalItems={totalItems}
						skip={skip}
						limit={limit}
					/> */}
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
