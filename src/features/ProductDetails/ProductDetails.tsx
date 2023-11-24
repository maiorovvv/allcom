import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

import Spinner from '../../components/Spinner/Spinner';
import { loadProduct } from './productDetailsSlice';

import MediaSwiper from './components/MediaSwiper';
import ShippingTab from './components/ShippingTab';

import Heart from '../../img/svg/heart.svg?react';

const ProductDetails: React.FC = (): JSX.Element => {
	const { t } = useTranslation('ProductDetails');
	const loading = useAppSelector((state: RootState) => state.product.loading);
	const product = useAppSelector((state: RootState) => state.product.product);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadProduct());
	}, []);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<div>
			<section className="product__details--section section--padding">
				<div className="container">
					<div className="row row-cols-lg-2 row-cols-md-2">
						<div className="col">
							<MediaSwiper product={product} />
						</div>
						<div className="col">
							<div className="product__details--info">
								<form action="#">
									<h2 className="product__details--info__title mb-15">{product.title}</h2>
									<div className="product__details--info__price mb-10">
										<span className="current__price">${product.price}</span>
										<span className="price__divided"></span>
										<span className="old__price"></span>
									</div>
									<p className="product__details--info__desc mb-15">{product.description}</p>
									<div className="product__variant">
										<div className="product__variant--list quantity d-flex align-items-center mb-20">
											<button className="quickview__cart--btn primary__btn" type="submit">
												{t('add_to_card')}
											</button>
										</div>
										<div className="product__variant--list mb-15">
											<a
												className="variant__wishlist--icon mb-15"
												href="wishlist.html"
												title={t('wishlist')}
											>
												<Heart />
												{t('wishlist')}
											</a>
											<button
												className="product__details_variant__buy--now__btn primary__btn"
												type="submit"
											>
												{t('by_it_now')}
											</button>
										</div>
										<div className="product__details--info__meta">
											<p className="product__details--info__meta--list">
												<strong>{t('brand')}:</strong> <span>{product.brand}</span>
											</p>
											<p className="product__details--info__meta--list">
												<strong>{t('category')}:</strong> <span>{product.category}</span>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<ShippingTab />
		</div>
	);
};

export default ProductDetails;
