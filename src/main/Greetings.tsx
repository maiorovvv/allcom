import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from 'react-bootstrap';

interface GreetingsProps {
	firstName: string;
	lastName: string;
}

const Greetings: React.FC<GreetingsProps> = ({ firstName, lastName }) => {
	const { t } = useTranslation('greetings');
	return (
		<div>
			<h2 className="h2">
				{t('greetings')}, {firstName} {lastName}!
			</h2>
			<h3 className="h3">{t('greetings_h3')}</h3>
			<p className="p">{t('greetings_p_1')}</p>

			<p className="p">{t('greetings_p_2')}</p>
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
