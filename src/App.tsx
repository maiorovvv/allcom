import { useTranslation } from 'react-i18next';
import NotFound from './features/NotFound/NotFound';

const locales = {
	en: { title: 'English' },
	de: { title: 'German' },
	ru: { title: 'Russian' },
};

function App(): JSX.Element {
	const { i18n } = useTranslation();

	return (
		<div>
			<ul>
				{Object.keys(locales).map((locale) => (
					<li key={locale}>
						<button
							style={{ fontWeight: i18n.resolvedLanguage === locale ? 'bold' : 'normal' }}
							type="submit"
							onClick={() => i18n.changeLanguage(locale)}
						>
							{locales[locale as keyof typeof locales].title}
						</button>
					</li>
				))}
			</ul>

			<NotFound />
		</div>
	);
}

export default App;
