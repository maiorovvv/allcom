import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import SetLanguage from './SetLanguage/SetLanguage';
import CategorySelect from './CategorySelect/CategorySelect';
import NavBarHeader from '../NavBarHeader/NavBarHeader';

import HeartIcon from '../../img/svg/heart.svg?react';
import CartIcon from '../../img/svg/cart_icon.svg?react';
import HumanIcon from '../../img/svg/human.svg?react';
import Human2Icon from '../../img/svg/human2.svg?react';
import CrossIcon from '../../img/svg/cross.svg?react';
import Cross2Icon from '../../img/svg/cross2.svg?react';
import UpArrowIcon from '../../img/svg/up_arrow.svg?react';
import LinesIcon from '../../img/svg/3lines.svg?react';
import CatrIconOffcanvas from '../../img/svg/cart_icon_offcanvas.svg?react';
import SearchIcon from '../../img/svg/search_icon.svg?react';
import CategoriesIcon from '../../img/svg/categories_icon.svg?react';

const Header: React.FC = () => {
	const { t } = useTranslation('header');
	const [countItemsInCart, setCountItemsInCart] = useState<number>(5);
	const [countItemsInWishlist, setCountItemsInWishlist] = useState<number>(0);
	const [offcanvasIsActive, setOffcanvasIsActive] = useState<boolean>(false);
	const [minicartIsActive, setMinicartIsActive] = useState<boolean>(false);
	const [searchBoxIsActive, setSearchBoxIsActive] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	const scrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const handleScroll = (): void => {
			if (window.scrollY > 20) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<header className="header__section">
				<div className={`main__header header__sticky ${isScrolled ? 'sticky' : ''}`}>
					<div className="container-fluid">
						<div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
							<div className="offcanvas__header--menu__open open">
								<div
									className="offcanvas__header--menu__open--btn"
									data-offcanvas
									onClick={() => setOffcanvasIsActive(!offcanvasIsActive)}
								>
									<LinesIcon />
									<span className="visually-hidden">Menu Open</span>
								</div>
							</div>
							<div className="main__logo">
								<h1 className="main__logo--title">
									<a className="main__logo--link" href="index.html">
										<img
											className="main__logo--img"
											src="assets/img/logo/nav-log.png"
											alt="logo"
										></img>
									</a>
								</h1>
							</div>
							<div className="header__search--widget header__sticky--none d-none d-lg-block mb-15">
								<form className="d-flex header__search--form" action="#">
									<CategorySelect />
									<div className="header__search--box">
										<label>
											<input
												className="header__search--input"
												placeholder={t('keyword_here')}
												type="text"
											></input>
										</label>
										<button
											className="header__search--button bg__secondary text-white"
											type="submit"
											aria-label="search button"
										>
											<SearchIcon />
										</button>
									</div>
								</form>
							</div>
							<div className="header__account header__sticky--none">
								<ul className="d-flex">
									<li className="header__account--items">
										<NavLink
											className={({ isActive }) =>
												isActive
													? 'active__nav_link header__account--btn'
													: 'header__account--btn cont_icons'
											}
											to="/user/my_account/about_me"
										>
											<HumanIcon />
											<span className="header__account--btn__text">{t('my_account')}</span>
										</NavLink>
									</li>

									<li className="header__account--items d-none d-lg-block">
										<NavLink
											className={({ isActive }) =>
												isActive
													? 'active__nav_link header__account--btn cont_icons'
													: 'header__account--btn cont_icons'
											}
											to="/user/my_account/products"
											end
										>
											<div className="my_icon">
												<HeartIcon />
												<span className="items__count_header">{countItemsInWishlist}</span>
											</div>
											<span className="header__account--btn__text">{t('wishlist')}</span>
										</NavLink>
									</li>
									<li className="header__account--items">
										<div
											className="header__account--btn cont_icons"
											onClick={() => setMinicartIsActive(!minicartIsActive)}
										>
											<div
												className="header__account--btn minicart__open--btn my_icon"
												data-offcanvas
											>
												<CartIcon />
												<span className="items__count_header">{countItemsInCart}</span>
											</div>
											<span className="header__account--btn__text">{t('cart')}</span>
										</div>
									</li>
								</ul>
							</div>
							<div className="header__menu d-none header__sticky--block d-lg-block">
								<nav className="header__menu--navigation">
									<ul className="d-flex">
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="about.html">
												{t('about_us')}{' '}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('contact_us')}{' '}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('faq')}{' '}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('register')}{' '}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('auction')}{' '}
											</a>
										</li>
									</ul>
								</nav>
							</div>
							<div className="header__account header__account2 header__sticky--block">
								<ul className="d-flex">
									<li className="header__account--items header__account2--items  header__account--search__items d-none d-lg-block">
										<div
											className="header__account--btn search__open--btn"
											onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
											data-offcanvas=""
										>
											<SearchIcon />
											<span className="visually-hidden">Search</span>
										</div>
									</li>
									<li className="header__account--items header__account2--items">
										<NavLink className="header__account--btn" to={'user/my_account'}>
											<HumanIcon />
											<span className="visually-hidden">My Account</span>
										</NavLink>
									</li>
									<li className="header__account--items header__account2--items d-none d-lg-block">
										<NavLink className="header__account--btn" to="/user/my_account/products">
											<HeartIcon />
											<span className="items__count  wishlist style2">{countItemsInWishlist}</span>
										</NavLink>
									</li>
									<li className="header__account--items header__account2--items">
										<div
											className="header__account--btn minicart__open--btn"
											onClick={() => setMinicartIsActive(!minicartIsActive)}
											data-offcanvas=""
										>
											<CartIcon />
											<span className="items__count style2">{countItemsInCart}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<NavBarHeader />

				<div className={`offcanvas__header ${offcanvasIsActive ? 'open' : ''}`}>
					<div className="offcanvas__inner">
						<div className="offcanvas__logo">
							<img src="" alt="Grocee Logo"></img>
							<button
								onClick={() => setOffcanvasIsActive(!offcanvasIsActive)}
								className="offcanvas__close--btn"
								data-offcanvas
							>
								close
							</button>
						</div>
						<nav className="offcanvas__menu">
							<ul className="offcanvas__menu_ul">
								<li className="offcanvas__menu_li">
									<a className="header__menu--link" href="about.html">
										{t('about_us')}{' '}
									</a>
								</li>
								<li className="offcanvas__menu_li">
									<a className="header__menu--link" href="contact.html">
										{t('contact_us')}{' '}
									</a>
								</li>
								<li className="offcanvas__menu_li">
									<a className="header__menu--link" href="contact.html">
										{t('faq')}{' '}
									</a>
								</li>
								<li className="offcanvas__menu_li">
									<a className="header__menu--link" href="contact.html">
										{t('register')}{' '}
									</a>
								</li>
								<li className="offcanvas__menu_li">
									<a className="header__menu--link" href="contact.html">
										{t('auction')}{' '}
									</a>
								</li>
							</ul>
							<div className="offcanvas__account--items">
								<a
									className="offcanvas__account--items__btn d-flex align-items-center"
									href="login.html"
								>
									<span className="offcanvas__account--items__icon">
										<Human2Icon />
									</span>
									<span className="offcanvas__account--items__label">Login / Register</span>
								</a>
							</div>
							<SetLanguage isOpen={''} />
						</nav>
					</div>
				</div>

				<div className="offcanvas__stikcy--toolbar">
					<ul className="d-flex justify-content-between">
						<li className="offcanvas__stikcy--toolbar__list">
							<NavLink className="offcanvas__stikcy--toolbar__btn" to="/">
								<span className="offcanvas__stikcy--toolbar__icon">
									<CategoriesIcon />
								</span>
								<span className="offcanvas__stikcy--toolbar__label">{t('categories')}</span>
							</NavLink>
						</li>
						<li className="offcanvas__stikcy--toolbar__list ">
							<div
								onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
								className="offcanvas__stikcy--toolbar__btn search__open--btn"
								data-offcanvas
							>
								<span className="offcanvas__stikcy--toolbar__icon">
									<SearchIcon />
								</span>
								<span className="offcanvas__stikcy--toolbar__label">{t('search')}</span>
							</div>
						</li>
						<li className="offcanvas__stikcy--toolbar__list ">
							<div
								onClick={() => setMinicartIsActive(!minicartIsActive)}
								className="offcanvas__stikcy--toolbar__btn minicart__open--btn cont_icons"
								data-offcanvas
							>
								<div className="my_icon">
									<span className="offcanvas__stikcy--toolbar__icon">
										<CatrIconOffcanvas />
									</span>
									<span className="items__count">{countItemsInCart}</span>
								</div>

								<span className="offcanvas__stikcy--toolbar__label">{t('cart')}</span>
							</div>
						</li>
						<li className="offcanvas__stikcy--toolbar__list">
							<NavLink
								className="offcanvas__stikcy--toolbar__btn cont_icons"
								to="/user/my_account/products"
							>
								<div className="my_icon">
									<span className="offcanvas__stikcy--toolbar__icon">
										<HeartIcon />
										<span className="items__count">{countItemsInWishlist}</span>
									</span>
								</div>
								<span className="offcanvas__stikcy--toolbar__label">{t('wishlist')}</span>
							</NavLink>
						</li>
					</ul>
				</div>

				<div className={`offCanvas__minicart ${minicartIsActive ? 'active_window' : ''}`}>
					<div className="minicart__header ">
						<div className="minicart__header--top d-flex justify-content-between align-items-center">
							<h2 className="minicart__title h3">{t('cart')}</h2>
							<button
								onClick={() => setMinicartIsActive(!minicartIsActive)}
								className="minicart__close--btn"
								aria-label="minicart close button"
								data-offcanvas
							>
								<Cross2Icon />
							</button>
						</div>
					</div>
					<div className="minicart__product">
						<div className="minicart__product--items d-flex">
							<div className="minicart__thumb">
								<a href="product/details.html">
									<img src="assets/img/product/product1.png" alt="prduct-img"></img>
								</a>
							</div>
							<div className="minicart__text">
								<h3 className="minicart__subtitle h4">
									<a href="product/details.html">Oversize Cotton Dress</a>
								</h3>
								<span className="color__variant">
									<b>Color:</b> Beige
								</span>
								<div className="minicart__price">
									<span className="current__price">$125.00</span>
									<span className="old__price">$140.00</span>
								</div>
								<div className="minicart__text--footer d-flex align-items-center">
									<div className="quantity__box minicart__quantity">
										<button
											type="button"
											className="quantity__value decrease"
											aria-label="quantity value"
											value="Decrease Value"
										>
											-
										</button>
										<label>
											<input type="number" className="quantity__number" value="1" data-counter />
										</label>
										<button
											type="button"
											className="quantity__value increase"
											value="Increase Value"
										>
											+
										</button>
									</div>
									<button className="minicart__product--remove">Remove</button>
								</div>
							</div>
						</div>
						<div className="minicart__product--items d-flex">
							<div className="minicart__thumb">
								<a href="product/details.html">
									<img src="assets/img/product/product2.png" alt="prduct-img"></img>
								</a>
							</div>
							<div className="minicart__text">
								<h3 className="minicart__subtitle h4">
									<a href="product/details.html">Boxy Denim Jacket</a>
								</h3>
								<span className="color__variant">
									<b>Color:</b> Green
								</span>
								<div className="minicart__price">
									<span className="current__price">$115.00</span>
									<span className="old__price">$130.00</span>
								</div>
								<div className="minicart__text--footer d-flex align-items-center">
									<div className="quantity__box minicart__quantity">
										<button
											type="button"
											className="quantity__value decrease"
											aria-label="quantity value"
											value="Decrease Value"
										>
											-
										</button>
										<label>
											<input type="number" className="quantity__number" value="1" data-counter />
										</label>
										<button
											type="button"
											className="quantity__value increase"
											aria-label="quantity value"
											value="Increase Value"
										>
											+
										</button>
									</div>
									<button className="minicart__product--remove">Remove</button>
								</div>
							</div>
						</div>
					</div>
					<div className="minicart__amount">
						<div className="minicart__amount_list d-flex justify-content-between">
							<span>{t('sub_total')}</span>
							<span>
								<b>$240.00</b>
							</span>
						</div>
						<div className="minicart__amount_list d-flex justify-content-between">
							<span>{t('total_sum')}</span>
							<span>
								<b>$240.00</b>
							</span>
						</div>
					</div>
					<div className="minicart__conditions text-center">
						<input className="minicart__conditions--input" id="accept" type="checkbox"></input>
						<label className="minicart__conditions--label">
							{t('agreement')}{' '}
							<a className="minicart__conditions--link" href="privacy-policy.html">
								{t('privacy_policy')}
							</a>
						</label>
					</div>
					<div className="minicart__button d-flex justify-content-center">
						<a className="primary__btn minicart__button--link" href="cart.html">
							{t('view_cart')}
						</a>
						<a className="primary__btn minicart__button--link" href="checkout.html">
							{t('checkout')}
						</a>
					</div>
				</div>

				<div className={`predictive__search--box ${searchBoxIsActive ? 'active_window' : ''}`}>
					<div className="predictive__search--box__inner">
						<h2 className="predictive__search--title">{t('search_products')}</h2>
						<form className="predictive__search--form" action="#">
							<label>
								<input
									className="predictive__search--input"
									placeholder={t('search_here')}
									type="text"
								></input>
							</label>
							<button
								className="predictive__search--button"
								aria-label="search button"
								type="submit"
							>
								<SearchIcon />
							</button>
						</form>
					</div>
					<button
						className="predictive__search--close__btn"
						onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
						aria-label="search close button"
						data-offcanvas
					>
						<CrossIcon />
					</button>
				</div>
			</header>
			<button onClick={scrollToTop} id="scroll__top" className={`${isScrolled ? 'active' : ''}`}>
				<UpArrowIcon />
			</button>
		</>
	);
};

export default Header;
