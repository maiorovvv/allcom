import { useTranslation } from 'react-i18next';

const Support: React.FC = (): JSX.Element => {
	const { t } = useTranslation('Support');
	return (
		<div>
			<p>{t('in_developing')}</p>
		</div>
	);
};

export default Support;
