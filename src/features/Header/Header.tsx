import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadProducts as loadProductsFromMyAuctions } from '../MyAccount/components/MyAuctions/myAuctionsSlice';
import { loadProducts } from '../user/wishProducts/productsSlice';

import SetLanguage from './SetLanguage/SetLanguage';
import CategorySelect from './CategorySelect/CategorySelect';
import NavBarHeader from '../NavBarHeader/NavBarHeader';

import SiteLogo from '../../img/logo/logo_main.png';
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
import Search from '../../components/Search/Search';
import { loadAllProducts } from '../HomePage/HomePageSlice';

const DEFAULT_CATEGORY_ID = 0;
const BACKEND_FIRST_PAGE_NUMBER = 0;

const Header: React.FC = () => {
	const { t } = useTranslation('header');

	const dispatch = useAppDispatch();

	const productsInMyAuctions = useAppSelector(
		(state: RootState) => state.myAuctions.productsInMyAuctions
	);
	const products = useAppSelector((state: RootState) => state.userProducts.products);

	const [offcanvasIsActive, setOffcanvasIsActive] = useState<boolean>(false);
	const [searchBoxIsActive, setSearchBoxIsActive] = useState<boolean>(false);
	const [isScrolled, setIsScrolled] = useState<boolean>(false);

	const [selectCategory, setSelectCategory] = useState<number>(DEFAULT_CATEGORY_ID);
	const handleCategoryChange = (category_id: number): void => {
		setSelectCategory(category_id);
		dispatch(loadAllProducts({ category_id }));
	};

	const headerSearch = (value: string): void => {
		if (selectCategory === DEFAULT_CATEGORY_ID) {
			dispatch(loadAllProducts({ search_query: value }));
		}
		dispatch(
			loadAllProducts({
				category_id: selectCategory,
				search_query: value,
				page_number: BACKEND_FIRST_PAGE_NUMBER,
			})
		);
	};

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
			if (window.scrollY > 100) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
	}, []);

	const overlay = (
		<div className="header__overlay" onClick={() => setOffcanvasIsActive((prev) => !prev)}></div>
	);

	const upArrowToStartButton = (
		<button
			onClick={scrollToTop}
			id="scroll__top"
			className={`${isScrolled ? 'active' : ''}`}
			data-testid="upArrowToStartButton"
		>
			<UpArrowIcon />
		</button>
	);
	const searchCloseButton = (
		<button
			className="predictive__search--close__btn"
			onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
			aria-label="search close button"
			data-offcanvas
			data-testid="searchCloseButton"
		>
			<CrossIcon />
		</button>
	);
	const searchInputPopup = <Search textPlaceholder={t('search_here')} search={headerSearch} />;
	const wishlistBottom = (
		<li className="offcanvas__stikcy--toolbar__list" data-testid="wishlistBottom">
			<NavLink
				className="offcanvas__stikcy--toolbar__btn cont_icons"
				to="/user/my_account/products"
				data-testid="wishlistBottom_link"
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
	);
	const myAuctionsBottom = (
		<li className="offcanvas__stikcy--toolbar__list" data-testid="myAuctionsBottom">
			<NavLink
				className="offcanvas__stikcy--toolbar__btn minicart__open--btn cont_icons"
				to="user/my_account/my_auctions"
				data-testid="myAuctionsBottom_link"
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
	);
	const searchBottom = (
		<li className="offcanvas__stikcy--toolbar__list" data-testid="searchBottom">
			<div
				onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
				className="offcanvas__stikcy--toolbar__btn search__open--btn"
				data-offcanvas
				data-testid="setSearchBoxIsActive"
			>
				<span className="offcanvas__stikcy--toolbar__icon" data-testid="SearchIcon">
					<SearchIcon />
				</span>
				<span className="offcanvas__stikcy--toolbar__label">{t('search')}</span>
			</div>
		</li>
	);
	const categoriesBottom = (
		<li className="offcanvas__stikcy--toolbar__list" data-testid="categoriesBottom">
			<NavLink
				className="offcanvas__stikcy--toolbar__btn"
				to="/"
				data-testid="categoriesBottom_link"
			>
				<span className="offcanvas__stikcy--toolbar__icon" data-testid="CategoriesIcon">
					<CategoriesIcon />
				</span>
				<span className="offcanvas__stikcy--toolbar__label">{t('categories')}</span>
			</NavLink>
		</li>
	);
	const loginRegisterSidepanelButton = (
		<div className="offcanvas__account--items" data-testid="loginRegisterSidepanelButton">
			<a
				className="offcanvas__account--items__btn d-flex align-items-center"
				href="/login"
				data-testid="loginRegisterSidepanelButton_link"
			>
				<span className="offcanvas__account--items__icon">
					<Human2Icon />
				</span>
				<span className="offcanvas__account--items__label">Login / Register</span>
			</a>
		</div>
	);
	const auctionSidepanel = (
		<li className="offcanvas__menu_li" data-testid="auctionSidepanel">
			<a
				className="header__menu--link"
				href="/user/my_account/my_auctions"
				data-testid="auctionSidepanel_link"
			>
				{t('auction')}{' '}
			</a>
		</li>
	);
	const addProductSidepanel = (
		<li className="offcanvas__menu_li" data-testid="addProductSidepanel">
			<a
				className="header__menu--link"
				href="/products/add_product"
				data-testid="addProductSidepanel_link"
			>
				{t('app_product')}{' '}
			</a>
		</li>
	);
	const registerSidepanel = (
		<li
			className="offcanvas__menu_li"
			data-testid="registerSidepanel"
			onClick={() => setOffcanvasIsActive((prev) => !prev)}
		>
			<NavLink className="header__menu--link" to="/register" data-testid="registerSidepanel_link">
				{t('register')}{' '}
			</NavLink>
		</li>
	);
	const faqSidepanel = (
		<li className="offcanvas__menu_li" data-testid="faqSidepanel">
			<a className="header__menu--link" href="/faq" data-testid="faqSidepanel_link">
				{t('faq')}{' '}
			</a>
		</li>
	);
	const contactSidepanel = (
		<li className="offcanvas__menu_li" data-testid="contactSidepanel">
			<a className="header__menu--link" href="/contact" data-testid="contactSidepanel_link">
				{t('contact_us')}{' '}
			</a>
		</li>
	);
	const aboutUsSidepanel = (
		<li
			className="offcanvas__menu_li"
			data-testid="aboutUsSidepanel"
			onClick={() => setOffcanvasIsActive((prev) => !prev)}
		>
			<NavLink className="header__menu--link" to="about_us" data-testid="aboutUsSidepanel_link">
				{t('about_us')}{' '}
			</NavLink>
		</li>
	);
	const closeSidepanelButton = (
		<CrossIcon
			className="offcanvas__close--btn"
			onClick={() => setOffcanvasIsActive(!offcanvasIsActive)}
			data-testid="closeSidepanelButton"
		/>
	);
	const logoSidepanel = (
		<div className="offcanvas__logo" data-testid="logoSidepanel">
			<img className="offcanvas__logo--img" src={SiteLogo} alt="Allcom Logo"></img>
			{closeSidepanelButton}
		</div>
	);
	const cart = (
		<li className="header__account--items header__account2--items" data-testid="my_auctions">
			<NavLink
				className="header__account--btn minicart__open--btn"
				to="user/my_account/my_auctions"
				data-testid="my_auctions_link"
			>
				<CartIcon />
				<span className="items__count style2">{productsInMyAuctions.length}</span>
			</NavLink>
		</li>
	);
	const wishlist = (
		<li
			className="header__account--items header__account2--items d-none d-lg-block"
			data-testid="wishlist"
		>
			<NavLink
				className="header__account--btn"
				to="/user/my_account/products"
				data-testid="wishlist_link"
			>
				<HeartIcon />
				<span className="items__count  wishlist style2">{products.length}</span>
			</NavLink>
		</li>
	);
	const myAccount = (
		<li className="header__account--items header__account2--items" data-testid="myAccount">
			<NavLink
				className="header__account--btn"
				data-testid="myAccount_link"
				to={'user/my_account/about_me'}
			>
				<HumanIcon />
				<span className="visually-hidden">My Account</span>
			</NavLink>
		</li>
	);
	const search = (
		<li
			className="header__account2--items  header__account--search__items d-none d-lg-block"
			data-testid="search"
		>
			<div
				className="header__account--btn search__open--btn"
				onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
			>
				<SearchIcon data-testid="search_icon" />
			</div>
		</li>
	);
	const auctionHideLink = (
		<li className="header__menu--items style2" data-testid="auction">
			<a className="header__menu--link" href="/auction" data-testid="auction_link">
				{t('auction')}
			</a>
		</li>
	);
	const registerHideLink = (
		<li className="header__menu--items style2" data-testid="register">
			<a className="header__menu--link" href="/register" data-testid="register_link">
				{t('register')}
			</a>
		</li>
	);
	const faqHideLink = (
		<li className="header__menu--items style2" data-testid="faq">
			<a className="header__menu--link" href="/faq" data-testid="faq_link">
				{t('faq')}
			</a>
		</li>
	);
	const contactHideLink = (
		<li className="header__menu--items style2" data-testid="contact_us">
			<a className="header__menu--link" href="/contact" data-testid="contact_us_Link">
				{t('contact_us')}
			</a>
		</li>
	);
	const aboutUsHideLink = (
		<li className="header__menu--items style2" data-testid="about_us">
			<a className="header__menu--link" data-testid="about_us_link" href="/about_us">
				{t('about_us')}
			</a>
		</li>
	);
	const wishlistTop = (
		<li className="header__account--items" data-testid="wishlistTop">
			<NavLink
				className={({ isActive }) =>
					isActive
						? 'active__nav_link header__account--btn cont_icons'
						: 'header__account--btn cont_icons'
				}
				to="/user/my_account/products"
				data-testid="wishlistTop_link"
			>
				<div className="my_icon">
					<HeartIcon />
					<span className="items__count_header">{products.length}</span>
				</div>
				<span className="header__account--btn__text">{t('wishlist')}</span>
			</NavLink>
		</li>
	);
	const cartTop = (
		<li className="header__account--items" data-testid="cartTop">
			<NavLink
				className="header__account--btn cont_icons"
				to="user/my_account/my_auctions"
				data-testid="cartTop_link"
			>
				<div className="my_icon">
					<CartIcon />
					<span className="items__count_header">{productsInMyAuctions.length}</span>
				</div>
				<span className="header__account--btn__text">{t('my_auctions')}</span>
			</NavLink>
		</li>
	);
	const myAccountTop = (
		<li className="header__account--items" data-testid="myAccountTop">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__account--btn' : 'header__account--btn cont_icons'
				}
				to="/user/my_account/about_me"
				data-testid="myAccountTop_link"
			>
				<HumanIcon />
				<span className="header__account--btn__text">{t('my_account')}</span>
			</NavLink>
		</li>
	);
	const searchInput = <Search textPlaceholder={t('keyword_here')} search={headerSearch} />;
	const siteLogo = (
		<div className="main__logo">
			<h1 className="main__logo--title">
				<NavLink to="/" className="main__logo--link">
					<img className="main__logo--img" src={SiteLogo} data-testid="siteLogo" alt="logo"></img>
				</NavLink>
			</h1>
		</div>
	);
	const hamburger = (
		<div className="offcanvas__header--menu__open open">
			<div
				className="offcanvas__header--menu__open--btn"
				data-offcanvas
				onClick={() => setOffcanvasIsActive(!offcanvasIsActive)}
				data-testid="hamburger"
			>
				<LinesIcon />
				<span className="visually-hidden">Menu Open</span>
			</div>
		</div>
	);
	return (
		<>
			<header className="header__section">
				<div className={`main__header header__sticky ${isScrolled ? 'sticky' : ''}`}>
					<div className="container-fluid">
						<div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
							{hamburger}
							{siteLogo}
							<div className="header__search--widget header__sticky--none d-none d-lg-block">
								<div className="header__search">
									<CategorySelect
										data-testid="CategorySelect"
										handleCategoryChange={handleCategoryChange}
									/>
									<div className="header__search--input">{searchInput}</div>
								</div>
							</div>
							<div className="header__account header__sticky--none">
								<ul className="d-flex">
									{myAccountTop}
									{wishlistTop}
									{cartTop}
								</ul>
							</div>
							<div className="header__menu d-none header__sticky--block d-lg-block">
								<nav className="header__menu--navigation">
									<ul className="d-flex">
										{aboutUsHideLink}
										{contactHideLink}
										{faqHideLink}
										{registerHideLink}
										{auctionHideLink}
									</ul>
								</nav>
							</div>
							<div className="header__account header__account2 header__sticky--block">
								<ul className="d-flex">
									{search}
									{myAccount}
									{wishlist}
									{cart}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<NavBarHeader />
				<div className={`offcanvas__header ${offcanvasIsActive ? 'open' : ''}`}>
					<div className="offcanvas__inner">
						{logoSidepanel}
						<nav className="offcanvas__menu">
							<ul className="offcanvas__menu_ul">
								{aboutUsSidepanel}
								{contactSidepanel}
								{faqSidepanel}
								{registerSidepanel}
								{auctionSidepanel}
								{addProductSidepanel}
							</ul>
							{loginRegisterSidepanelButton}
							{/* //TODO isOpen={''} */}
							<SetLanguage isOpen={''} />
						</nav>
					</div>
				</div>

				<div className="offcanvas__stikcy--toolbar z-50">
					<ul className="d-flex justify-content-between">
						{categoriesBottom}
						{searchBottom}
						{myAuctionsBottom}
						{wishlistBottom}
					</ul>
				</div>
				<div className={`predictive__search--box ${searchBoxIsActive ? 'active_window' : ''}`}>
					<div className="predictive__search--box__inner">
						<h2 className="predictive__search--title">{t('search_products')}</h2>
						{searchInputPopup}
					</div>
					{searchCloseButton}
				</div>
			</header>
			{upArrowToStartButton}
			{offcanvasIsActive && overlay}
		</>
	);
};

export default Header;
