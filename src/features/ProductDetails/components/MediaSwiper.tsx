import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useTranslation } from 'react-i18next';

import ProductDetailsInterface from '../types/ProductDetails';

interface ProductProps {
	product: ProductDetailsInterface;
}
const MediaSwiper = (props: ProductProps): JSX.Element => {
	const { product } = props;
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const { t, i18n } = useTranslation('ProductDetails');

	return (
		<div className="product__details--media">
			<div className="product__media--preview swiper">
				<Swiper
					style={{
						'--swiper-navigation-color': '#fff',
						'--swiper-pagination-color': '#fff',
					}}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mySwiper2"
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
					onSwiper={setThumbsSwiper}
					loop={true}
					spaceBetween={10}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mySwiper"
				>
					{product?.images?.length > 0 &&
						product.images.map((image, index) => (
							<SwiperSlide key={`swiper-${i18n.language}-${index}`}>
								<img className="product__media--nav__items--img" src={image} />
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default MediaSwiper;
