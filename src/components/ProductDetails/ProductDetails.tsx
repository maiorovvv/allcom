import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import SwiperCore from 'swiper/core';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import Spinner from '../Spinner/Spinner';
import { loadProduct } from './productDetailsSlice';

import SearchIcon from '../../img/svg/search_icon.svg?react';
import Heart from '../../img/svg/heart.svg?react';

SwiperCore.use([Navigation]);

const ProductDetails: React.FC = (): JSX.Element => {
	const { t } = useTranslation('ProductDetails');
	const loading = useAppSelector((state: RootState) => state.product.loading);
	const product = useAppSelector((state: RootState) => state.product.product);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadProduct());
	}, []);
	const thumbsSwiper = useRef<SwiperCore | null>(null);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	return (
		<div>
			<section className="breadcrumb__section breadcrumb__bg">
				<div className="container">
					<div className="row row-cols-1">
						<div className="col">
							<div className="breadcrumb__content text-center">
								<h1 className="breadcrumb__content--title text-white mb-25">Product Details</h1>
								<ul className="breadcrumb__content--menu d-flex justify-content-center">
									<li className="breadcrumb__content--menu__items">
										<a className="text-white" href="index.html">
											Home
										</a>
									</li>
									<li className="breadcrumb__content--menu__items">
										<span className="text-white"> / Product Details</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="product__details--section section--padding">
				<div className="container">
					<div className="row row-cols-lg-2 row-cols-md-2">
						<div className="col">
							<div className="product__details--media">
								<div className="product__media--preview swiper">
									<Swiper
										spaceBetween={10}
										navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
										thumbs={{ swiper: thumbsSwiper.current }}
									>
										{product.images.map((image, index) => (
											<SwiperSlide key={index}>
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
										{product.images.map((thumbnail, index) => (
											<SwiperSlide key={index}>
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
											<div className="quantity__box">
												<button
													type="button"
													className="quantity__value quickview__value--quantity decrease"
													aria-label="quantity value"
													value="Decrease Value"
												>
													-
												</button>
												<label>
													<input
														type="number"
														className="quantity__number quickview__value--number"
														value="1"
													/>
												</label>
												<button
													type="button"
													className="quantity__value quickview__value--quantity increase"
													aria-label="quantity value"
													value="Increase Value"
												>
													+
												</button>
											</div>
											<button className="quickview__cart--btn primary__btn" type="submit">
												Add To Cart
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
											<button className="variant__buy--now__btn primary__btn" type="submit">
												{t('by_it_now')}
											</button>
										</div>
										<div className="product__details--info__meta">
											<p className="product__details--info__meta--list">
												<strong>Barcode:</strong> <span>565461</span>
											</p>
											<p className="product__details--info__meta--list">
												<strong>Sky:</strong> <span>4420</span>
											</p>
											<p className="product__details--info__meta--list">
												<strong>Vendor:</strong> <span>Belo</span>
											</p>
											<p className="product__details--info__meta--list">
												<strong>Type:</strong> <span>Dress</span>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="shipping__section2 shipping__style3 section--padding pt-0">
				<div className="container">
					<div className="shipping__section2--inner shipping__style3--inner d-flex justify-content-between">
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src="assets/img/other/shipping1.png" alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">Shipping</h2>
								<p className="shipping__items2--content__desc">From handpicked sellers</p>
							</div>
						</div>
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src="assets/img/other/shipping2.png" alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">Payment</h2>
								<p className="shipping__items2--content__desc">From handpicked sellers</p>
							</div>
						</div>
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src="assets/img/other/shipping3.png" alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">Return</h2>
								<p className="shipping__items2--content__desc">From handpicked sellers</p>
							</div>
						</div>
						<div className="shipping__items2 d-flex align-items-center">
							<div className="shipping__items2--icon">
								<img src="assets/img/other/shipping4.png" alt="" />
							</div>
							<div className="shipping__items2--content">
								<h2 className="shipping__items2--content__title h3">Support</h2>
								<p className="shipping__items2--content__desc">From handpicked sellers</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductDetails;
