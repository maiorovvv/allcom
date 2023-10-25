//import React from 'react';

const Categories: React.FC = (): JSX.Element => {
	return (
		<div className="footer__widget">
			<h2 className="footer__widget--title text-ofwhite h3">
				Categories
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
					<a className="footer__widget--menu__text" href="about.html">
						About Us
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="contact.html">
						Contact Us
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="portfolio.html">
						Portfolio
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="privacy-policy.html">
						Privacy Policy
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="compare.html">
						Compare
					</a>
				</li>
				<li className="footer__widget--menu__list">
					<a className="footer__widget--menu__text" href="faq.html">
						Frequently
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Categories;
