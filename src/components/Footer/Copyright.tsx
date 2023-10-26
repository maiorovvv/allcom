//import React from 'react';

const Copyright: React.FC = (): JSX.Element => {
	return (
		<div className="footer__bottom d-flex justify-content-center align-items-center">
			<p className="copyright__content text-ofwhite m-0">
				Copyright © 2022{' '}
				<a className="copyright__content--link" href="index.html">
					Suruchi
				</a>{' '}
				. All Rights Reserved.Design By Suruchi
			</p>
		</div>
	);
};

export default Copyright;
