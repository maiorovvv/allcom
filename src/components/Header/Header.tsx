import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import SetLanguage from './set_language/SetLanguage';
import SelectComponent from './components/SelectComponent';

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
			if (window.scrollY > 50) {
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="ionicon offcanvas__header--menu__open--svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											stroke="currentColor"
											strokeLinecap="round"
											strokeMiterlimit="10"
											strokeWidth="32"
											d="M80 160h352M80 256h352M80 352h352"
										/>
									</svg>
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
									<SelectComponent />
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
											<svg
												className="header__search--button__svg"
												xmlns="http://www.w3.org/2000/svg"
												width="27.51"
												height="26.443"
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
										</button>
									</div>
								</form>
							</div>
							<div className="header__account header__sticky--none">
								<ul className="d-flex">
									<li className="header__account--items">
										<a className="header__account--btn" href="my-account.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="26.51"
												height="23.443"
												viewBox="0 0 512 512"
											>
												<path
													d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
													fill="none"
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="32"
												/>
												<path
													d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
													fill="none"
													stroke="currentColor"
													strokeMiterlimit="10"
													strokeWidth="32"
												/>
											</svg>
											<span className="header__account--btn__text">{t('my_account')}</span>
										</a>
									</li>
									<li className="header__account--items d-none d-lg-block">
										<div className="header__account--btn cont_icons">
											<div className="my_icon">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="28.51"
													height="23.443"
													viewBox="0 0 512 512"
												>
													<path
														d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
														fill="none"
														stroke="currentColor"
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="32"
													></path>
												</svg>
												<span className="items__count_header">{countItemsInWishlist}</span>
											</div>
											<span className="header__account--btn__text">{t('wishlist')}</span>
										</div>
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
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="26.51"
													height="23.443"
													viewBox="0 0 14.706 13.534"
												>
													<g transform="translate(0 0)">
														<g>
															<path
																data-name="Path 16787"
																d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z"
																transform="translate(0 -463.248)"
																fill="currentColor"
															/>
															<path
																data-name="Path 16788"
																d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z"
																transform="translate(-1.191 -466.622)"
																fill="currentColor"
															/>
															<path
																data-name="Path 16789"
																d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z"
																transform="translate(-2.875 -466.622)"
																fill="currentColor"
															/>
														</g>
													</g>
												</svg>
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
												{t('about')}{' '}
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
											<svg
												className="header__search--button__svg"
												xmlns="http://www.w3.org/2000/svg"
												width="26.51"
												height="23.443"
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
											<span className="visually-hidden">Search</span>
										</div>
									</li>
									<li className="header__account--items header__account2--items">
										<a className="header__account--btn" href="my-account.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="26.51"
												height="23.443"
												viewBox="0 0 512 512"
											>
												<path
													d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
													fill="none"
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="32"
												></path>
												<path
													d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
													fill="none"
													stroke="currentColor"
													strokeMiterlimit="10"
													strokeWidth="32"
												></path>
											</svg>
											<span className="visually-hidden">My Account</span>
										</a>
									</li>
									<li className="header__account--items header__account2--items d-none d-lg-block">
										<a className="header__account--btn" href="wishlist.html">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="28.51"
												height="23.443"
												viewBox="0 0 512 512"
											>
												<path
													d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
													fill="none"
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="32"
												></path>
											</svg>
											<span className="items__count  wishlist style2">{countItemsInWishlist}</span>
										</a>
									</li>
									<li className="header__account--items header__account2--items">
										<div
											className="header__account--btn minicart__open--btn"
											onClick={() => setMinicartIsActive(!minicartIsActive)}
											data-offcanvas=""
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="26.51"
												height="23.443"
												viewBox="0 0 14.706 13.534"
											>
												<g transform="translate(0 0)">
													<g>
														<path
															data-name="Path 16787"
															d="M4.738,472.271h7.814a.434.434,0,0,0,.414-.328l1.723-6.316a.466.466,0,0,0-.071-.4.424.424,0,0,0-.344-.179H3.745L3.437,463.6a.435.435,0,0,0-.421-.353H.431a.451.451,0,0,0,0,.9h2.24c.054.257,1.474,6.946,1.555,7.33a1.36,1.36,0,0,0-.779,1.242,1.326,1.326,0,0,0,1.293,1.354h7.812a.452.452,0,0,0,0-.9H4.74a.451.451,0,0,1,0-.9Zm8.966-6.317-1.477,5.414H5.085l-1.149-5.414Z"
															transform="translate(0 -463.248)"
															fill="currentColor"
														></path>
														<path
															data-name="Path 16788"
															d="M5.5,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,5.5,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,6.793,478.352Z"
															transform="translate(-1.191 -466.622)"
															fill="currentColor"
														></path>
														<path
															data-name="Path 16789"
															d="M13.273,478.8a1.294,1.294,0,1,0,1.293-1.353A1.325,1.325,0,0,0,13.273,478.8Zm1.293-.451a.452.452,0,1,1-.431.451A.442.442,0,0,1,14.566,478.352Z"
															transform="translate(-2.875 -466.622)"
															fill="currentColor"
														></path>
													</g>
												</g>
											</svg>
											<span className="items__count style2">{countItemsInCart}</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="header__bottom">
					<div className="container-fluid">
						<div className="row align-items-center position__relative justify-content-between">
							<div className="col-xxl-7 col-xl-7 col-lg-7 col-md-4 col-3">
								<div className="header__menu d-none d-lg-block">
									<nav className="header__menu--navigation">
										<ul className="d-flex">
											<li className="header__menu--items style2">
												<a className="header__menu--link" href="about.html">
													{t('about')}{' '}
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
													{t('add_product')}{' '}
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
							</div>
							<div className="col-xxl-5 col-xl-4 col-lg-3 col-md-4 col-3 d-flex justify-content-end">
								<SetLanguage isOpen={'d-none'} />
							</div>
						</div>
					</div>
				</div>

				{/* offcanvas_header_cloce */}

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
										{t('about')}{' '}
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20.51"
											height="19.443"
											viewBox="0 0 512 512"
										>
											<path
												d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
												fill="none"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="32"
											/>
											<path
												d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
												fill="none"
												stroke="currentColor"
												strokeMiterlimit="10"
												strokeWidth="32"
											/>
										</svg>
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
							<a className="offcanvas__stikcy--toolbar__btn" href="shop.html">
								<span className="offcanvas__stikcy--toolbar__icon">
									<svg
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
										width="18.51"
										height="17.443"
										viewBox="0 0 448 512"
									>
										<path d="M416 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zm-16 48v152H248V80zm-200 0v152H48V80zM48 432V280h152v152zm200 0V280h152v152z"></path>
									</svg>
								</span>
								<span className="offcanvas__stikcy--toolbar__label">{t('categories')}</span>
							</a>
						</li>
						<li className="offcanvas__stikcy--toolbar__list ">
							<div
								onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
								className="offcanvas__stikcy--toolbar__btn search__open--btn"
								data-offcanvas
							>
								<span className="offcanvas__stikcy--toolbar__icon">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="22.51"
										height="20.443"
										viewBox="0 0 512 512"
									>
										<path
											d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
											fill="none"
											stroke="currentColor"
											strokeMiterlimit="10"
											strokeWidth="32"
										/>
										<path
											fill="none"
											stroke="currentColor"
											strokeLinecap="round"
											strokeMiterlimit="10"
											strokeWidth="32"
											d="M338.29 338.29L448 448"
										/>
									</svg>
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
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18.51"
											height="15.443"
											viewBox="0 0 18.51 15.443"
										>
											<path
												d="M79.963,138.379l-13.358,0-.56-1.927a.871.871,0,0,0-.6-.592l-1.961-.529a.91.91,0,0,0-.226-.03.864.864,0,0,0-.226,1.7l1.491.4,3.026,10.919a1.277,1.277,0,1,0,1.844,1.144.358.358,0,0,0,0-.049h6.163c0,.017,0,.034,0,.049a1.277,1.277,0,1,0,1.434-1.267c-1.531-.247-7.783-.55-7.783-.55l-.205-.8h7.8a.9.9,0,0,0,.863-.651l1.688-5.943h.62a.936.936,0,1,0,0-1.872Zm-9.934,6.474H68.568c-.04,0-.1.008-.125-.085-.034-.118-.082-.283-.082-.283l-1.146-4.037a.061.061,0,0,1,.011-.057.064.064,0,0,1,.053-.025h1.777a.064.064,0,0,1,.063.051l.969,4.34,0,.013a.058.058,0,0,1,0,.019A.063.063,0,0,1,70.03,144.853Zm3.731-4.41-.789,4.359a.066.066,0,0,1-.063.051h-1.1a.064.064,0,0,1-.063-.051l-.789-4.357a.064.064,0,0,1,.013-.055.07.07,0,0,1,.051-.025H73.7a.06.06,0,0,1,.051.025A.064.064,0,0,1,73.76,140.443Zm3.737,0L76.26,144.8a.068.068,0,0,1-.063.049H74.684a.063.063,0,0,1-.051-.025.064.064,0,0,1-.013-.055l.973-4.357a.066.066,0,0,1,.063-.051h1.777a.071.071,0,0,1,.053.025A.076.076,0,0,1,77.5,140.448Z"
												transform="translate(-62.393 -135.3)"
												fill="currentColor"
											/>
										</svg>
									</span>
									<span className="items__count">{countItemsInCart}</span>
								</div>

								<span className="offcanvas__stikcy--toolbar__label">{t('cart')}</span>
							</div>
						</li>
						<li className="offcanvas__stikcy--toolbar__list">
							<a className="offcanvas__stikcy--toolbar__btn cont_icons" href="wishlist.html">
								<div className="my_icon">
									<span className="offcanvas__stikcy--toolbar__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="18.541"
											height="15.557"
											viewBox="0 0 18.541 15.557"
										>
											<path
												d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z"
												transform="translate(-62.498 -132.915)"
												fill="currentColor"
											/>
										</svg>
										<span className="items__count">{countItemsInWishlist}</span>
									</span>
								</div>
								<span className="offcanvas__stikcy--toolbar__label">{t('wishlist')}</span>
							</a>
						</li>
					</ul>
				</div>

				<div className={`offCanvas__minicart ${minicartIsActive ? 'active' : ''}`}>
					<div className="minicart__header ">
						<div className="minicart__header--top d-flex justify-content-between align-items-center">
							<h2 className="minicart__title h3">{t('cart')}</h2>
							<button
								onClick={() => setMinicartIsActive(!minicartIsActive)}
								className="minicart__close--btn"
								aria-label="minicart close button"
								data-offcanvas
							>
								<svg
									className="minicart__close--icon"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path
										fill="currentColor"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="32"
										d="M368 368L144 144M368 144L144 368"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div className="minicart__product">
						<div className="minicart__product--items d-flex">
							<div className="minicart__thumb">
								<a href="product-details.html">
									<img src="assets/img/product/product1.png" alt="prduct-img"></img>
								</a>
							</div>
							<div className="minicart__text">
								<h3 className="minicart__subtitle h4">
									<a href="product-details.html">Oversize Cotton Dress</a>
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
								<a href="product-details.html">
									<img src="assets/img/product/product2.png" alt="prduct-img"></img>
								</a>
							</div>
							<div className="minicart__text">
								<h3 className="minicart__subtitle h4">
									<a href="product-details.html">Boxy Denim Jacket</a>
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

				<div className={`predictive__search--box ${searchBoxIsActive ? 'active' : ''}`}>
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
								<svg
									className="header__search--button__svg"
									xmlns="http://www.w3.org/2000/svg"
									width="30.51"
									height="25.443"
									viewBox="0 0 512 512"
								>
									<path
										d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
										fill="none"
										stroke="currentColor"
										strokeMiterlimit="10"
										strokeWidth="32"
									/>
									<path
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeMiterlimit="10"
										strokeWidth="32"
										d="M338.29 338.29L448 448"
									/>
								</svg>{' '}
							</button>
						</form>
					</div>
					<button
						className="predictive__search--close__btn"
						onClick={() => setSearchBoxIsActive(!searchBoxIsActive)}
						aria-label="search close button"
						data-offcanvas
					>
						<svg
							className="predictive__search--close__icon"
							xmlns="http://www.w3.org/2000/svg"
							width="40.51"
							height="30.443"
							viewBox="0 0 512 512"
						>
							<path
								fill="currentColor"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="32"
								d="M368 368L144 144M368 144L144 368"
							/>
						</svg>
					</button>
				</div>
			</header>
			<button onClick={scrollToTop} id="scroll__top" className={`${isScrolled ? 'active' : ''}`}>
				<svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512">
					<path
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="48"
						d="M112 244l144-144 144 144M256 120v292"
					/>
				</svg>
			</button>
		</>
	);
};

export default Header;
