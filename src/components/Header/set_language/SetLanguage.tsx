import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import language_icon from '../../../img/language_icon.svg';

type IProps = {
	isOpen: string;
};

const SetLanguage: React.FC<IProps> = (isOpen): JSX.Element => {
	const locales = {
		en: { title: 'English' },
		de: { title: 'Deutsch' },
		ru: { title: 'Русский' },
	};
	const { i18n } = useTranslation();

	const [isActive, seetIsActive] = useState(false);

	return (
		<div className={`language__currency ${isOpen.isOpen} d-lg-block`}>
			<ul className="d-flex align-items-center">
				<li className="language__currency--list">
					<img className="language__switcher--icon__img" src={language_icon} alt="language"></img>
					<span
						className="language_text_set"
						onClick={() => {
							seetIsActive(!isActive);
						}}
					>
						{locales[i18n.language as keyof typeof locales].title}
					</span>
					<div className={`dropdown__language ${isActive ? 'active' : ''}`}>
						<ul>
							{Object.keys(locales).map((locale) => (
								<li
									key={locale}
									className="language__text language_trans header_language_style"
									style={{
										fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal',
									}}
									onClick={() => {
										i18n.changeLanguage(locale);
										seetIsActive(!isActive);
									}}
								>
									{locales[locale as keyof typeof locales].title}
								</li>
							))}
						</ul>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default SetLanguage;
