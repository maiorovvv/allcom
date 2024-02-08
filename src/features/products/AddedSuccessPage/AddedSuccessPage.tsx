import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AddedSuccessPage: FC = (): JSX.Element => {
	const { t } = useTranslation('product_added_success_page');

	return (
		<div className="added_success_page">
			<h2 className="added_success_page__title">{t('added_successfully')}</h2>
			<div className="added_success_page__buttons">
				<NavLink className="added_success_page__buttons--btn" to="/">
					{t('link_back_to_home')}
				</NavLink>
				<NavLink className="added_success_page__buttons--btn" to="/product/products_list">
					{t('link_to_product_list')}
				</NavLink>
				<NavLink className="added_success_page__buttons--btn" to="/products/add">
					{t('link_add_product')}
				</NavLink>
			</div>
		</div>
	);
};

export default AddedSuccessPage;
