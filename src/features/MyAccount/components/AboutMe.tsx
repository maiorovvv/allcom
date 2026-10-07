import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Spinner from '../../../components/Spinner/Spinner';
import { RootState } from '../../../app/store';
import { loadUser } from '../UserSlice';
import { selectIsAuthenticated } from '../../auth/selectors';

const AboutMe: FC = (): JSX.Element => {
	const { t } = useTranslation('about_me');
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(selectIsAuthenticated);

	useEffect(() => {
		if (isAuth) {
			dispatch(loadUser());
		}
	}, [isAuth]);

	const loading = useAppSelector((state: RootState) => state.userData.loading);
	const userData = useAppSelector((state: RootState) => state.userData.user);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<div className="about_me">
				<Form>
					<Form.Group controlId="formBasicName">
						<Form.Label>{t('first_name')}</Form.Label>
						<Form.Control
							className="about_me-input"
							type="text"
							defaultValue={userData?.firstName}
							readOnly
						/>
					</Form.Group>

					<Form.Group controlId="formBasicLastName">
						<Form.Label>{t('last_name')}</Form.Label>
						<Form.Control
							className="about_me-input"
							type="text"
							defaultValue={userData?.lastName}
							readOnly
						/>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>{t('email')}</Form.Label>
						<Form.Control
							type="email"
							defaultValue={userData?.email}
							className="about_me-input"
							readOnly
						/>
					</Form.Group>

					<Form.Group controlId="formBasicPhone">
						<Form.Label>{t('phone')}</Form.Label>
						<Form.Control
							className="about_me-input"
							type="text"
							defaultValue={userData?.phoneNumber}
							readOnly
						/>
					</Form.Group>

					<Form.Group controlId="formBasicAddress">
						<Form.Label>{t('address')}</Form.Label>
						<Form.Control
							className="about_me-input"
							type="text"
							defaultValue={`${userData?.address?.street || ''} ${
								userData?.address?.houseNumber || ''
							}, ${userData?.address?.city || ''}, ${userData?.address?.postIndex || ''}`}
							readOnly
						/>
					</Form.Group>
				</Form>
			</div>
		</>
	);
};
export default AboutMe;
