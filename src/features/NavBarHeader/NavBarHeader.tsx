import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import SetLanguage from '../Header/SetLanguage/SetLanguage';

const NavBarHeader: FC = (): JSX.Element => {
	const { t } = useTranslation('header');

	const chooseLanguageButton = (
		<div
			className="col-xxl-5 col-xl-4 col-lg-3 col-md-4 col-3 d-flex justify-content-end"
			data-testid="choose_language_button"
		>
			<SetLanguage isOpen={'d-none'} />
		</div>
	);

	const registration = (
		<li className="header__menu--items style2" data-testid="register">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/register"
				data-testid="register_link"
			>
				{t('register')}
			</NavLink>
		</li>
	);

	const login = (
		<li className="header__menu--items style2" data-testid="login">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/login"
				data-testid="login_link"
			>
				{t('login')}
			</NavLink>
		</li>
	);

	const faq = (
		<li className="header__menu--items style2" data-testid="faq">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/faq"
				data-testid="faq_link"
			>
				{t('faq')}
			</NavLink>
		</li>
	);

	const contact = (
		<li className="header__menu--items style2" data-testid="contact_us">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/contact"
				data-testid="contact_us_link"
			>
				{t('contact_us')}
			</NavLink>
		</li>
	);

	const addNewProduct = (
		<li className="header__menu--items style2" data-testid="add_product">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/products/add_product"
				data-testid="add_product_link"
			>
				{t('add_product')}
			</NavLink>
		</li>
	);

	const aboutUs = (
		<li className="header__menu--items style2" data-testid="about_us">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/about_us"
				data-testid="about_us_link"
			>
				{t('about_us')}
			</NavLink>
		</li>
	);

	const productsList = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/product/products_list"
			>
				{t('products_list')}
			</NavLink>
		</li>
	);
	return (
		<div className="header__bottom">
			<div className="container-fluid">
				<div className="row align-items-center position__relative justify-content-between">
					<div className="col-xxl-7 col-xl-7 col-lg-7 col-md-4 col-3">
						<div className="header__menu d-none d-lg-block">
							<nav className="header__menu--navigation">
								<ul className="d-flex" data-testid="header__bottom">
									{aboutUs}
									{contact}
									{faq}
									{login}
									{registration}
									{addNewProduct}
									{productsList}
								</ul>
							</nav>
						</div>
					</div>
					{chooseLanguageButton}
				</div>
			</div>
		</div>
	);
};

export default NavBarHeader;
