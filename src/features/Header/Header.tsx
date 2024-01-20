import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadProducts as loadProductsFromMyAuctions } from '../MyAccount/components/MyAuctions/myAuctionsSlice';
import { loadProducts } from '../../features/user/wishProducts/productsSlice';

import SetLanguage from './SetLanguage/SetLanguage';
import CategorySelect from './CategorySelect/CategorySelect';
import NavBarHeader from '../NavBarHeader/NavBarHeader';

import SiteLogo from '../../assets/img/logo/nav-log.png';
import HeartIcon from '../../img/svg/heart.svg?react';
import CartIcon from '../../img/svg/cart_icon.svg?react';
import HumanIcon from '../../img/svg/human.svg?react';
import Human2Icon from '../../img/svg/human2.svg?react';
import CrossIcon from '../../img/svg/cross.svg?react';
import UpArrowIcon from '../../img/svg/up_arrow.svg?react';
import LinesIcon from '../../img/svg/3lines.svg?react';
import CartIconOffcanvas from '../../img/svg/cart_icon_offcanvas.svg?react';
import SearchIcon from '../../img/svg/search_icon.svg?react';
import CategoriesIcon from '../../img/svg/categories_icon.svg?react';

const Header: React.FC = () => {
	const { t } = useTranslation('header');

	const productsInMyAuctions = useAppSelector(
		(state: RootState) => state.myAuctions.productsInMyAuctions
	);
	const products = useAppSelector((state: RootState) => state.userProducts.products);

	const [offcanvasIsActive, setOffcanvasIsActive] = useState<boolean>(false);
	const [searchBoxIsActive, setSearchBoxIsActive] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadProductsFromMyAuctions());
		dispatch(loadProducts());
	}, []);

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
									<NavLink to="/" className="main__logo--link">
										<img className="main__logo--img" src={SiteLogo} alt="logo"></img>
									</NavLink>
								</h1>
							</div>
							<div className="header__search--widget header__sticky--none d-none d-lg-block">
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

									<li className="header__account--items">
										<NavLink
											className={({ isActive }) =>
												isActive
													? 'active__nav_link header__account--btn cont_icons'
													: 'header__account--btn cont_icons'
											}
											to="/user/my_account/products"
										>
											<div className="my_icon">
												<HeartIcon />
												<span className="items__count_header">{products.length}</span>
											</div>
											<span className="header__account--btn__text">{t('wishlist')}</span>
										</NavLink>
									</li>
									<li className="header__account--items">
										<NavLink
											className="header__account--btn cont_icons"
											to="user/my_account/my_auctions"
										>
											<div className="my_icon">
												<CartIcon />
												<span className="items__count_header">{productsInMyAuctions.length}</span>
											</div>
											<span className="header__account--btn__text">{t('my_auctions')}</span>
										</NavLink>
									</li>
								</ul>
							</div>
							<div className="header__menu d-none header__sticky--block d-lg-block">
								<nav className="header__menu--navigation">
									<ul className="d-flex">
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="about.html">
												{t('about_us')}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('contact_us')}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('faq')}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('register')}
											</a>
										</li>
										<li className="header__menu--items style2">
											<a className="header__menu--link" href="contact.html">
												{t('auction')}
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
										>
											<SearchIcon />
											<span className="visually-hidden">Search</span>
										</div>
									</li>
									<li className="header__account--items header__account2--items">
										<NavLink className="header__account--btn" to={'user/my_account/about_me'}>
											<HumanIcon />
											<span className="visually-hidden">My Account</span>
										</NavLink>
									</li>
									<li className="header__account--items header__account2--items d-none d-lg-block">
										<NavLink className="header__account--btn" to="/user/my_account/products">
											<HeartIcon />
											<span className="items__count  wishlist style2">{products.length}</span>
										</NavLink>
									</li>
									<li className="header__account--items header__account2--items">
										<NavLink
											className="header__account--btn minicart__open--btn"
											to="user/my_account/my_auctions"
										>
											<CartIcon />
											<span className="items__count style2">{productsInMyAuctions.length}</span>
										</NavLink>
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
							<img className="offcanvas__logo--img" src={SiteLogo} alt="Grocee Logo"></img>
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
							{/* //TODO isOpen={''} */}
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
							<NavLink
								className="offcanvas__stikcy--toolbar__btn minicart__open--btn cont_icons"
								to="user/my_account/my_auctions"
							>
								<div className="my_icon">
									<span className="offcanvas__stikcy--toolbar__icon">
										<CartIconOffcanvas />
									</span>
									<span className="items__count">{productsInMyAuctions.length}</span>
								</div>

								<span className="offcanvas__stikcy--toolbar__label">{t('my_auctions')}</span>
							</NavLink>
						</li>
						<li className="offcanvas__stikcy--toolbar__list">
							<NavLink
								className="offcanvas__stikcy--toolbar__btn cont_icons"
								to="/user/my_account/products"
							>
								<div className="my_icon">
									<span className="offcanvas__stikcy--toolbar__icon">
										<HeartIcon />
										<span className="items__count">{products.length}</span>
									</span>
								</div>
								<span className="offcanvas__stikcy--toolbar__label">{t('wishlist')}</span>
							</NavLink>
						</li>
					</ul>
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
