import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { loadProducts } from './productsSlice';
import Baner from './baner/Baner';
import Basket from '../../img/svg/cart_icon.svg?react';
import Heart from '../../img/svg/heart.svg?react';
import Eye from '../../img/svg/eye.svg?react';
import Spinner from '../../components/Spinner/Spinner';

const Products: React.FC = (): JSX.Element => {
	const { t } = useTranslation('home');
	const loading = useAppSelector((state: RootState) => state.userProducts.loading);
	const products = useAppSelector((state: RootState) => state.products.products);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadProducts());
	}, []);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);
	return (
		<main className="main__content_wrapper">
			<Baner /> <br />
			<br />
			<section className="product__section section--padding pt-0">
				<div className="container-fluid">
					<div className="product_section__heading text-center mb-35">
						<h2 className="product_section__heading--maintitle">{t('header')}</h2>
					</div>
					<div className="tab_content">
						<div id="featured" className="tab_pane active show">
							<div className="product__section--inner">
								<div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30">
									{products.map((product) => (
										<div key={product.id} className="col mb-30">
											<div className="product__items">
												<div className="product__items--thumbnail">
													<NavLink className="product__items--link" to="/product-details">
														<img
															src={product.image}
															className="product__items--img"
															alt="product-img"
														/>
													</NavLink>
												</div>
												<div className="product__items--content">
													<span className="product__items--content__subtitle">{product.title}</span>
													<div className="product__items--content__title">
														<NavLink to="/product-details">{product.category}</NavLink>
													</div>
													<div className="product__items--price">
														<span className="product_current__price">${product.price}</span>
													</div>
													<ul className="product__items--action d-flex">
														<li className="product__items--action__list">
															<div className="product__items--action__btn add__to--cart">
																<Basket />
																<span className="product_add__to--cart__text">
																	{t('add_to_card')}
																</span>
															</div>
														</li>
														<li className="product__items--action__list">
															<div className="product__items--action__btn">
																<Heart />
																<span className="visually-hidden">{t('wishlist')}</span>
															</div>
														</li>
														<li className="product__items--action__list">
															<NavLink className="product__items--action__btn" to="/view_product">
																<Eye />
															</NavLink>
														</li>
													</ul>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default Products;
