import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../../app/hooks';
import { RootState } from '../../../../app/store';

import Timer from '../../../../components/Timer/Timer';
import SwiperModalWindow from './SwiperModalWindow';

import CloseIcon from '../../../../img/svg/cross.svg?react';
import HeartIcon from '../../../../img/svg/heart.svg?react';

interface ModalWindowProps {
	activeWindow: boolean;
	setActiveWindow: (flag: boolean) => void;
	getProductById: (product_id: number) => void;
}

const ModalWindowProduct: FC<ModalWindowProps> = ({
	activeWindow,
	setActiveWindow,
	getProductById,
}) => {
	const { t } = useTranslation('modal_window_product');
	const productById = useAppSelector((state: RootState) => state.homePage.productById);

	const { id, title, description, price, category, images, time, color, weight } = productById;

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
							<SwiperModalWindow images={images} />
						</div>
						<div className="modal_window__col--info">
							<h3 className="modal_window__title">{title}</h3>
							<span className="modal_window__description">{description}</span>
							<div className="modal_window__auction_info">
								<div className="modal_window__actual_price">
									{t('actual_price')}
									<span className="modal_window__price">{price} &euro;</span>
								</div>
								<div className="modal_window__timer">
									<span className="modal_window__timer--left">{t('left_time')}:</span>
									<Timer time={time} />
								</div>
							</div>
							<div className="modal_window__detailsInformation">
								<div>
									<span className="modal_window__detailsInformation--item">{t('category')}:</span>
									{category}
								</div>
								<div>
									<span className="modal_window__detailsInformation--item">{t('color')}:</span>
									{color}
								</div>
								<div>
									<span className="modal_window__detailsInformation--item">{t('weight')}:</span>
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
