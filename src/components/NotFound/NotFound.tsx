import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'react-bootstrap';

const NotFound: React.FC = (): JSX.Element => {
	const { t } = useTranslation('404-page');

	const contentTitle = (
		<h2 className="error__content--title" data-testid="content_title">
			{t('content_title')}
		</h2>
	);
	const contentDescription = (
		<p className="error__content--desc" data-testid="content_desc">
			{t('content_desc')}
		</p>
	);
	const buttonHome = (
		<Button
			className="error__content--btn primary__btn"
			data-testid="back_to_home_button"
			id="button_home"
			href="/"
		>
			{t('link_back_to_home')}
		</Button>
	);
	return (
		<div className="error__content" data-testid="error__content">
			{contentTitle}
			{contentDescription}
			{buttonHome}
		</div>
	);
};

export default NotFound;
