import { useTranslation } from 'react-i18next';

const locales = {
	en: { title: 'English' },
	de: { title: 'German' },
	ru: { title: 'Russian' },
};

const SelectLocale = (): JSX.Element => {
	const { i18n } = useTranslation();

	return (
		<ul>
			{Object.keys(locales).map((locale) => (
				<li key={locale}>
					<button
						style={{
							fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal',
						}}
						type="submit"
						onClick={() => i18n.changeLanguage(locale)}
					>
						{locales[locale as keyof typeof locales].title}
					</button>
				</li>
			))}
		</ul>
	);
};

export default SelectLocale;
