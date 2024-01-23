import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import SetLanguage from '../Header/SetLanguage/SetLanguage';

const NavBarHeader: FC = (): JSX.Element => {
	const { t } = useTranslation('header');

	const chooseLanguageButton = (
		<div className="col-xxl-5 col-xl-4 col-lg-3 col-md-4 col-3 d-flex justify-content-end">
			<SetLanguage isOpen={'d-none'} />
		</div>
	);
	const addNewProduct = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/products/addnew"
			>
				{t('add_product')}
			</NavLink>
		</li>
	);
	const registration = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/register"
			>
				{t('register')}
			</NavLink>
		</li>
	);
	const login = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/login"
			>
				{t('login')}
			</NavLink>
		</li>
	);
	const faq = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/faq"
			>
				{t('faq')}
			</NavLink>
		</li>
	);
	const contact = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/contact"
			>
				{t('contact_us')}
			</NavLink>
		</li>
	);
	const aboutUs = (
		<li className="header__menu--items style2">
			<NavLink
				className={({ isActive }) =>
					isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
				}
				to="/about"
			>
				{t('about_us')}
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
								<ul className="d-flex">
									{aboutUs}
									{contact}
									{faq}
									{login}
									{registration}
									{addNewProduct}
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
