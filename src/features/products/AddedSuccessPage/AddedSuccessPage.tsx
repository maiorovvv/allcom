import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddedSuccessPage: FC = (): JSX.Element => {
	const { t } = useTranslation('product_added_success_page');

	return (
		<div>
			<h2>Товар успешно добавлен!</h2>
			<div>
				<NavLink to="/">{t('link_back_to_home')}</NavLink>
				<NavLink to="/products">{t('link_to_product_list')}</NavLink>
				<NavLink to="/products/add_product">{t('link_add_product')}</NavLink>
			</div>
		</div>
	);
};

export default AddedSuccessPage;
