import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import language_icon from '../../../img/svg/language_icon.svg';

type IProps = {
	isOpen: string;
};

const SetLanguage: React.FC<IProps> = ({ isOpen }: IProps): JSX.Element => {
	const locales = {
		en: { title: 'English' },
		de: { title: 'Deutsch' },
		ru: { title: 'Русский' },
	};

	const { i18n } = useTranslation();
	const [isActive, setIsActive] = useState(false);

	const languageKey = i18n.language?.split('-')[0];
	const localeTitle = locales[languageKey as keyof typeof locales]?.title;

	const dropdownRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsActive(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={`language__currency ${isOpen} d-lg-block`} data-testid="language-currency">
			<ul className="d-flex align-items-center">
				<li className="language__currency--list">
					<img className="language__switcher--icon__img" src={language_icon} alt="language" />
					<span
						className="language_text_set"
						onClick={() => {
							setIsActive(!isActive);
						}}
						data-testid="language-text-set"
					>
						{localeTitle}
					</span>
					<div
						className={`dropdown__language ${isActive ? 'active_window' : ''}`}
						ref={dropdownRef}
						data-testid="dropdown-language"
					>
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
										setIsActive(!isActive);
									}}
									data-testid={`language-option-${locale}`}
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
