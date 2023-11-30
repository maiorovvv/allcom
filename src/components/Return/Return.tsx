import { useTranslation } from 'react-i18next';

const Return: React.FC = () => {
	const { t } = useTranslation('Return');
	return (
		<div>
			<p>{t('in_developing')}</p>
		</div>
	);
};

export default Return;
