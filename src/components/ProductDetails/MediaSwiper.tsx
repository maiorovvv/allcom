import { useRef } from 'react';
import ProductDetailsInterface from '../ProductDetails/types/ProductDetails';
import SwiperCore from 'swiper/core';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import SearchIcon from '../../img/svg/search_icon.svg?react';

SwiperCore.use([Navigation]);

interface ProductProps {
	product: ProductDetailsInterface;
}
const MediaSwiper = (props: ProductProps): JSX.Element => {
	const { product } = props;
	const thumbsSwiper = useRef<SwiperCore | null>(null);

	return (
		<div className="product__details--media">
			<div className="product__media--preview swiper">
				<Swiper
					spaceBetween={10}
					navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
					thumbs={{ swiper: thumbsSwiper.current }}
				>
					{product?.images?.length > 0 &&
						product.images.map((image, index) => (
							<SwiperSlide key={`swiper-${index}`}>
								<div className="product__media--preview__items">
									<a
										className="product__media--preview__items--link glightbox"
										data-gallery="product-media-preview"
										href={image}
									>
										<img
											className="product__media--preview__items--img"
											src={image}
											alt={`product-media-img-${index}`}
										/>
									</a>
									<div className="product__media--view__icon">
										<a
											className="product__media--view__icon--link glightbox"
											href={image}
											data-gallery="product-media-preview"
										>
											<SearchIcon />
										</a>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			<div className="product__media--nav swiper">
				<Swiper
					spaceBetween={10}
					slidesPerView={3}
					navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
					onSwiper={(swiper) => (thumbsSwiper.current = swiper)}
				>
					{product?.images?.length > 0 &&
						product.images.map((thumbnail, index) => (
							<SwiperSlide key={`swiper-thumb1-${index}`}>
								<div className="product__media--nav__items">
									<img
										className="product__media--nav__items--img"
										src={thumbnail}
										alt={`product-nav-img-${index}`}
									/>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
				<div className="swiper-button-next"></div>
				<div className="swiper-button-prev"></div>
			</div>
		</div>
	);
};

export default MediaSwiper;
