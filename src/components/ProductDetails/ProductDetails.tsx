import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './ProductDetails.module.scss';

const ProductDetails: React.FC = (): JSX.Element => {
	const { t } = useTranslation('ProductDetails');

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
										<span className="text-white">Product Details</span>
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
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product2.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product2.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product2.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product1.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product1.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product1.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product3.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product3.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product3.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product4.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product4.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product4.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product5.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product5.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product5.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--preview__items">
												<a
													className="product__media--preview__items--link glightbox"
													data-gallery="product-media-preview"
													href="assets/img/product/big-product6.jpg"
												>
													<img
														className="product__media--preview__items--img"
														src="assets/img/product/big-product6.jpg"
														alt="product-media-img"
													/>
												</a>
												<div className="product__media--view__icon">
													<a
														className="product__media--view__icon--link glightbox"
														href="assets/img/product/big-product6.jpg"
														data-gallery="product-media-preview"
													>
														<svg
															className="product__media--view__icon--svg"
															xmlns="http://www.w3.org/2000/svg"
															width="22.51"
															height="22.443"
															viewBox="0 0 512 512"
														>
															<path
																d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
																fill="none"
																stroke="currentColor"
																strokeMiterlimit="10"
																strokeWidth="32"
															></path>
															<path
																fill="none"
																stroke="currentColor"
																strokeLinecap="round"
																strokeMiterlimit="10"
																strokeWidth="32"
																d="M338.29 338.29L448 448"
															></path>
														</svg>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="product__media--nav swiper">
									<div className="swiper-wrapper">
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product7.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product8.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product9.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product10.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product11.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
										<div className="swiper-slide">
											<div className="product__media--nav__items">
												<img
													className="product__media--nav__items--img"
													src="assets/img/product/small-product12.png"
													alt="product-nav-img"
												/>
											</div>
										</div>
									</div>
									<div className="swiper__nav--btn swiper-button-next"></div>
									<div className="swiper__nav--btn swiper-button-prev"></div>
								</div>
							</div>
						</div>
						<div className="col">
							<div className="product__details--info">
								<form action="#">
									<h2 className="product__details--info__title mb-15">Oversize Cotton Dress</h2>
									<div className="product__details--info__price mb-10">
										<span className="current__price">$110</span>
										<span className="price__divided"></span>
										<span className="old__price">$178</span>
									</div>
									<p className="product__details--info__desc mb-15">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut numquam ullam is
										recusandae laborum explicabo id sequi quisquam, ab sunt deleniti quidem ea animi
										facilis quod nostrum odit! Repellendus voluptas suscipit cum harum dolor sciunt.
									</p>
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
												title="Add to wishlist"
											>
												<svg
													className="quickview__variant--wishlist__svg"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 512 512"
												>
													<path
														d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
														fill="none"
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="32"
													/>
												</svg>
												Add to Wishlist
											</a>
											<button className="variant__buy--now__btn primary__btn" type="submit">
												Buy it now
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
