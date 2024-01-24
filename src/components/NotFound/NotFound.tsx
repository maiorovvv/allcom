import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'react-bootstrap';

const NotFound: React.FC = (): JSX.Element => {
	const { t } = useTranslation('404-page');

	const contentTitle = <h2 className="error__content--title">{t('content_title')}</h2>;
	const contentDescription = <p className="error__content--desc">{t('content_desc')}</p>;
	const buttonHome = (
		<Button className="error__content--btn primary__btn" href="/">
			{t('link_back_to_home')}
		</Button>
	);
	return (
		<div className="error__content">
			{contentTitle}
			{contentDescription}
			{buttonHome}
		</div>
	);
};

export default NotFound;
