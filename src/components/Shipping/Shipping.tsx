import { useTranslation } from 'react-i18next';

const Shipping: React.FC = (): JSX.Element => {
	const { t } = useTranslation('Shipping');
	return (
		<div>
			<p>{t('in_developing')}</p>
		</div>
	);
};

export default Shipping;
