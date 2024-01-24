import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SetLanguage from '../Header/SetLanguage/SetLanguage';
import { NavLink } from 'react-router-dom';

const NavBarHeader: FC = (): JSX.Element => {
	const { t } = useTranslation('header');

	return (
		<div className="header__bottom">
			<div className="container-fluid">
				<div className="row align-items-center position__relative justify-content-between">
					<div className="col-xxl-7 col-xl-7 col-lg-7 col-md-4 col-3">
						<div className="header__menu d-none d-lg-block">
							<nav className="header__menu--navigation">
								<ul className="d-flex">
									<li className="header__menu--items style2">
										<NavLink
											className={({ isActive }) =>
												isActive ? 'active__nav_link header__menu--link' : 'header__menu--link'
											}
											to="/about_us"
										>
											{t('about_us')}
										</NavLink>
									</li>
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
	);
};

export default NavBarHeader;
