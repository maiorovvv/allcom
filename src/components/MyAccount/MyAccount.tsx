import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Routes } from 'react-router-dom';

import AboutMe from './components/AboutMe';
import ChangePassword from './components/ChangePassword';
import Products from '../../features/user/wishProducts/ProductList';
import MyAuctions from './components/MyAuctions/MyAuctions';

const MyAccount: FC = (): JSX.Element => {
	const { t } = useTranslation('my_account');

	return (
		<section className="my__account--section section--padding">
			<div className="container">
				<div className="my__account--section__inner border-radius-10">
					<div className="my_account__left--sidebar">
						<h2 className="my_account__content--title h3 mb-20">{t('my_profile')}</h2>
						<div className="my_account__menu">
							<NavLink
								to="/user/my_account/my_auctions"
								className={({ isActive }) =>
									isActive ? 'active__nav_link my_account__menu--list' : 'my_account__menu--list'
								}
							>
								<div>{t('my_auctions')}</div>
							</NavLink>
							<NavLink
								to="/user/my_account/products"
								className={({ isActive }) =>
									isActive ? 'active__nav_link my_account__menu--list' : 'my_account__menu--list'
								}
							>
								<div>{t('wishlist')}</div>
							</NavLink>
							<NavLink
								to="2"
								className={({ isActive }) =>
									isActive ? 'active__nav_link my_account__menu--list' : 'my_account__menu--list'
								}
							>
								<div>{t('log_out')}</div>
							</NavLink>
							<NavLink
								to="/user/my_account/about_me"
								className={({ isActive }) =>
									isActive ? 'active__nav_link my_account__menu--list' : 'my_account__menu--list'
								}
							>
								<div>{t('about_me')}</div>
							</NavLink>
							<NavLink
								to="/user/my_account/change_password"
								className={({ isActive }) =>
									isActive ? 'active__nav_link my_account__menu--list' : 'my_account__menu--list'
								}
							>
								<div>{t('change_password')}</div>
							</NavLink>
						</div>
					</div>
					<div className="my_account__wrapper">
						<div className="my_account__content">
							<Routes>
								<Route path="my_auctions" element={<MyAuctions />} />
								<Route path="products" element={<Products />} />
								<Route path="about_me" element={<AboutMe />} />
								<Route path="change_password" element={<ChangePassword />} />
							</Routes>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyAccount;
