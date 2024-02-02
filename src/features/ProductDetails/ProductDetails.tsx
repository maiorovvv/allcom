import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';
import ShippingTab from './components/ShippingTab';

import HeartIcon from '../../img/svg/heart.svg?react';
import SwiperModalWindow from '../../components/SwiperModalWindow/SwiperModalWindow';

const ProductDetails: FC = (): JSX.Element => {
	const { t } = useTranslation('ProductDetails');

	const loading = useAppSelector((state: RootState) => state.product.loading);
	const product = useAppSelector((state: RootState) => state.product.product);

	const { name, description, color, weight, categoryId, photoLinks } = product;

	// const images = photoLinks

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
							<SwiperModalWindow images={photoLinks} />
						</div>
						<div className="col">
							<div className="product__details--info">
								<form action="#">
									<h2 className="product__details--info__title mb-15">{name}</h2>
									<div className="product__details--info__price mb-10">
										{/* <span className="current__price">${product.price}</span> */}
										<span className="current__price">200</span>
									</div>
									<p className="product__details--info__desc mb-15">{description}</p>
									<div className="product__variant">
										<div className="product__variant--list mb-15">
											<a
												className="variant__wishlist--icon mb-15"
												href="/user/my_account/products"
												title={t('wishlist')}
											>
												<HeartIcon />
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
												<strong>{t('category')}:</strong> <span>{categoryId}</span>
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
