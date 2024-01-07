import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const MyAccount: FC = (): JSX.Element => {
	const { t } = useTranslation('my_account');

	const navigate = useNavigate();

	const handleLogout = (): void => {
		navigate('/');
	};

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
							<div onClick={handleLogout} className="my_account__menu--list">
								<div>{t('log_out')}</div>
							</div>
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
							<Outlet />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyAccount;
