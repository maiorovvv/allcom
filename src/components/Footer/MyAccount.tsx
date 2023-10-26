//import React from 'react';

const MyAccount: React.FC = (): JSX.Element => {
	return (
		<div className="footer__widget">
			<h2 className="footer__widget--title text-ofwhite h3">
				My Account
				<button className="footer__widget--button" aria-label="footer widget button">
					<svg
						className="footer__widget--title__arrowdown--icon"
						xmlns="http://www.w3.org/2000/svg"
						width="12.355"
						height="8.394"
						viewBox="0 0 10.355 6.394"
					>
						<path
							d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
							transform="translate(-6 -8.59)"
							fill="currentColor"
						></path>
					</svg>
				</button>
			</h2>
			<ul className="footer__widget--menu footer__widget--inner">
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="my-account.html">
						My Account
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="cart.html">
						Shopping Cart
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="login.html">
						Login
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="login.html">
						Register
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="checkout.html">
						Checkout
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="wishlist.html">
						Wishlist
					</a>
				</li>
			</ul>
		</div>
	);
};

export default MyAccount;
