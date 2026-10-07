/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Spinner from '../../components/Spinner/Spinner';
import Product from './components/Product';
import Poster from './components/Poster/Poster';
import Pagination from '../../components/Pagination/Pagination';
import ModalWindowProduct from './components/ModalWindow/ModalWindowProduct';
import { selectCategories } from '../categories/selectors';
import {
	selectLoadingAllProducts,
	selectNumberPage,
	selectProducts,
	selectTotalPages,
} from '../products/selectors';
import { filterProductById, loadAllProducts } from '../products/productsSlice';

import * as Stomp from 'stompjs';
// eslint-disable-next-line import/extensions
import * as SockJS from 'sockjs-client/dist/sockjs.js';
import { AuctionWsDto } from '../../types/auction';

const HomePage: FC = (): JSX.Element => {
	const { t } = useTranslation('home_page');

	const [activeWindow, setActiveWindow] = useState<boolean>(false);

	const products = useAppSelector(selectProducts);
	const loadingAllProducts = useAppSelector(selectLoadingAllProducts);
	const totalPages = useAppSelector(selectTotalPages);
	const numberPage = useAppSelector(selectNumberPage);
	const categories = useAppSelector(selectCategories);

	const dispatch = useAppDispatch();

	const getProductById = (product_id: number): void => {
		dispatch(filterProductById(product_id));
	};

	const loadContentForPage = (page_number: number): void => {
		dispatch(loadAllProducts({ page_number }));
	};

	const [auction, setAuction] = useState<AuctionWsDto>({} as AuctionWsDto);
	useEffect(() => {
		dispatch(loadAllProducts({}));
		const socket = new SockJS('/ws');
		const client = Stomp.over(socket);

		client.connect({}, (frame) => {
			console.log('Connected: ', frame);

			client.subscribe(`/topic/auction/info`, (auctionData) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				setAuction(JSON.parse(auctionData.body));
			});
		});

		return () => {
			if (client) {
				client.disconnect();
				console.log('Disconnected');
			}
		};
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
						{products &&
							products.map((item) => (
								<Product
									key={item.id}
									product={item}
									setActiveWindow={setActiveWindow}
									getProductById={getProductById}
									categories={categories}
									auction={auction}
								/>
							))}
					</div>
					<Pagination
						loadContentForPage={loadContentForPage}
						totalPages={totalPages}
						numberPage={numberPage}
					/>
				</div>
			</div>
			<ModalWindowProduct
				activeWindow={activeWindow}
				setActiveWindow={setActiveWindow}
				categories={categories}
			/>
		</div>
	);
};

export default HomePage;
