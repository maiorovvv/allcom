import * as React from 'react';
import { useTranslation } from 'react-i18next';

const Contact: React.FC = () => {
	const { t } = useTranslation('contact');
	return (
		<div className="contact-page">
			<h1 className="contact-h1"> {t('contact_h1')} </h1>
			<div className="contact-container">
				<div className="contact-left-content">
					<span> {t('contact_span')}</span>
					<p>
						<strong> {t('contact_strong')}</strong>
					</p>
					<ul>
						<li> {t('contact_li_1')} </li>
						<li> {t('contact_li_2')}</li>
					</ul>
				</div>
				<div className="contact-right-content">
					<h2>{t('contact_h2')}</h2>
					<p>{t('contact_p_1')}</p>
					<p>{t('contact_p_2')}</p>
					<p>{t('contact_p_3')}</p>
					<h3>{t('contact_h3_1')}</h3>
					<p>{t('contact_p_4')}</p>
					<h3>{t('contact_h3_2')}</h3>
					<p>{t('contact_p_5')}</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
