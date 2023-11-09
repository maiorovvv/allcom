import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AboutMeDetails from './components/AboutMeDetails';

const MyAccount: FC = (): JSX.Element => {
	const { t } = useTranslation('my_account');

	return (
		<section className="my__account--section section--padding">
			<div className="container">
				<div className="my__account--section__inner border-radius-10 d-flex">
					<div className="account__left--sidebar">
						<h2 className="account__content--title h3 mb-20">{t('my_profile')}</h2>
						<ul className="account__menu">
							<li className="account__menu--list active">
								<div>{t('dashboard')}</div>
							</li>
							<li className="account__menu--list">
								<div>{t('wishlist')}</div>
							</li>
							<li className="account__menu--list">
								<div>{t('log_out')}</div>
							</li>
							<li className="account__menu--list">
								<div>{t('about_me')}</div>
							</li>
						</ul>
					</div>
					<div className="account__wrapper">
						<div className="account__content">
							<h2 className="account__content--title h3 mb-20">{t('about_me')}</h2>
							{/* <div className="account__table--area">
								<table className="account__table">
									<thead className="account__table--header">
										<tr className="account__table--header__child">
											<th className="account__table--header__child--items">Order</th>
											<th className="account__table--header__child--items">Date</th>
											<th className="account__table--header__child--items">Payment Status</th>
											<th className="account__table--header__child--items">Fulfillment Status</th>
											<th className="account__table--header__child--items">Total</th>
										</tr>
									</thead>
									<tbody className="account__table--body mobile__none">
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#2014</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Unfulfilled</td>
											<td className="account__table--body__child--items">$40.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#2024</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Fulfilled</td>
											<td className="account__table--body__child--items">$44.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#2164</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Unfulfilled</td>
											<td className="account__table--body__child--items">$36.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#2345</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Unfulfilled</td>
											<td className="account__table--body__child--items">$87.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#1244</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Fulfilled</td>
											<td className="account__table--body__child--items">$66.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#3455</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Fulfilled</td>
											<td className="account__table--body__child--items">$55.00 USD</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">#4566</td>
											<td className="account__table--body__child--items">February 06, 2022</td>
											<td className="account__table--body__child--items">Paid</td>
											<td className="account__table--body__child--items">Unfulfilled</td>
											<td className="account__table--body__child--items">$87.00 USD</td>
										</tr>
									</tbody>
									<tbody className="account__table--body mobile__block">
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
										<tr className="account__table--body__child">
											<td className="account__table--body__child--items">
												<strong>Order</strong>
												<span>#2014</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Date</strong>
												<span>November 24, 2022</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Payment Status</strong>
												<span>Paid</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Fulfillment Status</strong>
												<span>Unfulfilled</span>
											</td>
											<td className="account__table--body__child--items">
												<strong>Total</strong>
												<span>$40.00 USD</span>
											</td>
										</tr>
									</tbody>
								</table>
							</div> */}
							<AboutMeDetails />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MyAccount;
