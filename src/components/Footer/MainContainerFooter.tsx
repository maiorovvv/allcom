//import React from 'react';

import AboutUs from './AboutUs';
import Categories from './Categories';
import MyAccount from './MyAccount';

const MainFooter: React.FC = (): JSX.Element => {
	return (
		<div className="main__footer d-flex justify-content-evenly">
			<AboutUs />
			<div className="footer__widget--menu__wrapper d-flex footer__widget--width">
				<MyAccount />
				<Categories />
			</div>
		</div>
	);
};

export default MainFooter;
