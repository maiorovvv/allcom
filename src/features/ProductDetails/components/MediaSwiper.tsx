/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CSSProperties, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/free-mode';
import 'swiper/scss/navigation';
import 'swiper/scss/thumbs';

import { useTranslation } from 'react-i18next';
import ProductDetailsInterface from '../types/ProductDetails';

interface ProductProps {
	product: ProductDetailsInterface;
}

const MediaSwiper = (props: ProductProps): JSX.Element => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [activeThumbIndex, setActiveThumbIndex] = useState(0);
	const { product } = props;
	const { i18n } = useTranslation('ProductDetails');

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const handleSwiperSlideChange = (swiper: Swiper): void => {
		const activeSlideIndex: number | undefined = swiper?.realIndex;
		setActiveThumbIndex(activeSlideIndex ?? 0);
	};

	return (
		<div className="product__details--media">
			<div className="product__media--preview swiper">
				<Swiper
					style={
						{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
						} as CSSProperties
					}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					onSlideChange={handleSwiperSlideChange}
					modules={[FreeMode, Navigation, Thumbs]}
				>
					{product?.images?.length > 0 &&
						product.images.map((image, index) => (
							<SwiperSlide key={`swiper-${i18n.language}-${index}`}>
								<img className="product__media--preview__items--img" src={image} />
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			<div className="product__media--nav swiper">
				<Swiper
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={3}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
				>
					{product?.images?.length > 0 &&
						product.images.map((image, index) => {
							const isActive = activeThumbIndex === index;
							const className = `product__media--nav__items--img ${isActive ? 'active' : ''}`;

							return (
								<SwiperSlide key={`swiper-${i18n.language}-${index}`}>
									<img className={className} src={image} />
								</SwiperSlide>
							);
						})}
				</Swiper>
			</div>
		</div>
	);
};

export default MediaSwiper;
