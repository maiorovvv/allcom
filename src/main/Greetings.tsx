import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'react-bootstrap';
import { useAppSelector } from '../app/hooks';
import { selectUser } from '../features/auth/selectors';

const Greetings: React.FC = () => {
	const { t } = useTranslation('greetings');
	const user = useAppSelector(selectUser);
	return (
		<div>
			<h3 className="h3">
				{t('greetings')}, {user?.firstName} {user?.lastName}!
			</h3>
			<h3 className="h3">{t('greetings_h3')}</h3>
			<p className="p">{t('greetings_p_1')}</p>
			<p className="p">
				{t('greetings_p_3')}
				<br /> Allcom
			</p>
			<Button
				className="error__content--btn primary__btn"
				data-testid="back_to_home_button"
				id="button_home"
				href="/"
			>
				{t('link_back_to_home')}
			</Button>
		</div>
	);
};
export default Greetings;
