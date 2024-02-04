import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Spinner from '../../components/Spinner/Spinner';
import ShippingTab from './components/ShippingTab';

import HeartIcon from '../../img/svg/heart.svg?react';
import MediaSwiper from '../../components/MediaSwiper/MediaSwiper';
import { getNameCategory } from '../categories/utilsCategories';
import i18next from 'i18next';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import Timer from '../../components/Timer/Timer';

const ProductDetails: FC = (): JSX.Element => {
	const locale = i18next.language;
	const { t } = useTranslation('product_details');

	const [confirmationModalActive, setConfirmationModalActive] = useState<boolean>(false);

	const loading = useAppSelector((state: RootState) => state.product.loading);
	const product = useAppSelector((state: RootState) => state.product.product);
	const categories = useAppSelector((state: RootState) => state.categories.categories);

	const {
		name,
		description,
		color,
		weight,
		categoryId,
		imageLinks,
		lastCreatedAuction: { startPrice, startAt, currentPlannedEndAt },
	} = product;

	const betNow = (confirm: boolean): void => {
		console.log(confirm);
	};

	const currentPlannedEnd = moment(currentPlannedEndAt);
	const formattedDate = moment(startAt).format('YYYY-MM-DD HH:mm:ss');
	const timeUntilCurrentPlannedEnd = currentPlannedEnd.diff(moment(), 'seconds');

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<section className="section--padding">
				<div className="product_details__container container">
					<div className="product_details__swiper">
						<MediaSwiper images={imageLinks} />
					</div>
					<div className="product_details__info">
						<h2 className="product_details__info__title">{name}</h2>
						<p>{description}</p>
						<div className="product_details__info__price">
							{t('current_price')}
							<span className="product_details__info__price--actual">{startPrice} &euro;</span>
							<span className="product_details__info__price--aufgeld">+ {t('tax')}</span>
						</div>
						<div className="product_details__meta">
							<div className="product_details__meta-info">
								<div>
									<strong>{t('category')}:</strong>
									<span className="ms-3">{getNameCategory(categories, categoryId, locale)}</span>
								</div>
								<div className="mt-2 mb-2">
									<strong>{t('color')}:</strong>
									<span className="ms-3">{color}</span>
								</div>
								<div>
									<strong>{t('weight')}:</strong>
									<span className="ms-3">{weight} kg</span>
								</div>
							</div>
							<div className="product_details__meta--time">
								{timeUntilCurrentPlannedEnd < 0 ? (
									<div>
										<strong className="me-5">{t('start_at')}:</strong>
										<span className="product_details__meta--time__start">{formattedDate}</span>
									</div>
								) : (
									<div className="d-flex">
										<span className="me-5">{t('left_time')}:</span>
										<Timer time={timeUntilCurrentPlannedEnd} />
									</div>
								)}
							</div>
						</div>

						<div className="product_details__buttons">
							<a
								className="product_details__buttons--wishlist_icon"
								href="/user/my_account/products"
								title={t('wishlist')}
							>
								<HeartIcon />
								{t('add_to_wishlist')}
							</a>
							<button
								className="product_details__buttons--btn"
								onClick={() => setConfirmationModalActive((prev) => !prev)}
							>
								{t('bet_now')}
							</button>
						</div>
					</div>
				</div>
			</section>
			<ShippingTab />
			<ConfirmationModal
				confirmationModalActive={confirmationModalActive}
				setConfirmationModal={setConfirmationModalActive}
				text={t('is_confirm')}
				onConfirm={betNow}
			/>
		</>
	);
};

export default ProductDetails;
