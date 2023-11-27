import { useTranslation } from 'react-i18next';

const Payment: React.FC = () => {
	const { t } = useTranslation('Payment');
	return (
		<div>
			<p>{t('in_developing')}</p>
		</div>
	);
};

export default Payment;
