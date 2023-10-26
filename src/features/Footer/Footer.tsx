// import React from 'react';

import Copyright from './Copyright';
import MainFooter from './MainContainerFooter';
import './scss/Footer.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

const Footer: React.FC = (): JSX.Element => {
	return (
		<footer className="footer__section bg__black">
			<div className="container-fluid ">
				<MainFooter />
				<Copyright />
			</div>
		</footer>
	);
};

export default Footer;
