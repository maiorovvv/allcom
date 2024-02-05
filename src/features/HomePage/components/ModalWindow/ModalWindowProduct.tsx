import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import i18next from 'i18next';

import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import Timer from '../../../../components/Timer/Timer';
import SwiperProduct from '../../../../components/Swiper/SwiperInModalWindow/SwiperProduct';

import CloseIcon from '../../../../img/svg/cross.svg?react';
import HeartIcon from '../../../../img/svg/heart.svg?react';

import { CategoriesDto } from '../../../categories/types/CategoriesDto';
import { getNameCategory } from '../../../categories/utilsCategories';

interface ModalWindowProps {
	activeWindow: boolean;
	setActiveWindow: (flag: boolean) => void;
	getProductById: (product_id: number) => void;
	categories: CategoriesDto[];
}

const ModalWindowProduct: FC<ModalWindowProps> = ({
	activeWindow,
	setActiveWindow,
	getProductById,
	categories,
}) => {
	const { t } = useTranslation('modal_window_product');

	const locale = i18next.language;

	const productById = useAppSelector((state: RootState) => state.homePage.productById);

	const {
		id,
		name,
		description,
		categoryId,
		color,
		weight,
		imageLinks,
		lastCreatedAuction: { startPrice, startAt, currentPlannedEndAt },
	} = productById;

	const currentPlannedEnd = moment(currentPlannedEndAt);
	const formattedDate = moment(startAt).format('YYYY-MM-DD HH:mm:ss');
	const timeUntilCurrentPlannedEnd = currentPlannedEnd.diff(moment(), 'seconds');

	return (
		<>
			{activeWindow ? (
				<div
					className="modal_window__overlay modal_window__overlay--active"
					onClick={() => setActiveWindow(false)}
				>
					<div className="modal_window" onClick={(e) => e.stopPropagation()}>
						<CloseIcon className="modal_window__close" onClick={() => setActiveWindow(false)} />
						<div className="modal_window__col--images">
							<SwiperProduct images={imageLinks} />
						</div>
						<div className="modal_window__col--info">
							<h3 className="modal_window__title">{name}</h3>
							<span className="modal_window__description">{description}</span>
							<div className="modal_window__auction_info">
								<div className="modal_window__actual_price">
									{t('actual_price')}
									<span className="modal_window__price">{startPrice} &euro;</span>
								</div>
								<div className="modal_window__timer">
									{timeUntilCurrentPlannedEnd > 0 ? (
										<div className="d-flex">
											<span className="modal_window__timer--left">{t('left_time')}:</span>
											<Timer time={timeUntilCurrentPlannedEnd} />
										</div>
									) : (
										<div>
											<span className="modal_window__timer--start">{t('start_at')}:</span>
											<span className="modal_window__timer--start__format">{formattedDate}</span>
										</div>
									)}
								</div>
							</div>
							<div className="modal_window__details_information">
								<div>
									<span className="modal_window__details_information--item">{t('category')}:</span>
									{getNameCategory(categories, categoryId, locale)}
								</div>
								<div>
									<span className="modal_window__details_information--item">{t('color')}:</span>
									{color}
								</div>
								<div>
									<span className="modal_window__details_information--item">{t('weight')}:</span>
									{weight} kg
								</div>
							</div>
							<div className="modal_window__buttons">
								<span className="modal_window__buttons--add_to_wishlist">
									<HeartIcon />
									{t('add_to_wishlist')}
								</span>
								<NavLink to="products/details/" onClick={() => getProductById(id)}>
									<button className="modal_window__buttons--btn">{t('bet_now')}</button>
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="modal_window__overlay"></div>
			)}
		</>
	);
};

export default ModalWindowProduct;
