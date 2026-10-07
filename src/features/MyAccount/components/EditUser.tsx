import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLoadUser, selectUser } from '../selectors';
import Spinner from '../../../components/Spinner/Spinner';

import CloseIcon from '../../../img/svg/cross.svg?react';
import { updateUserById } from '../UserSlice';
import { UserFormValues } from '../types/UserFormValues';

interface EditUserProps {
	editUserModalActive: boolean;
	setEditUserModalActive: (flag: boolean) => void;
}

const EditUser: FC<EditUserProps> = ({
	editUserModalActive,
	setEditUserModalActive,
}): JSX.Element => {
	const { t } = useTranslation('edit_user');
	const dispatch = useAppDispatch();

	const loading = useAppSelector(selectLoadUser);
	const userData = useAppSelector(selectUser);

	const [formData, setFormData] = useState<UserFormValues>(userData);
	useEffect(() => {
		setFormData(userData);
	}, [userData]);

	const handleChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		e.preventDefault();
		dispatch(updateUserById({ user_id: userData.id, data: formData }));
		setEditUserModalActive(false);
	};

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			{editUserModalActive ? (
				<div
					className="edit_user--overlay edit_user--overlay--active"
					onClick={() => setEditUserModalActive(false)}
				>
					<div className="edit_user" onClick={(e) => e.stopPropagation()}>
						<CloseIcon
							className="edit_user__close_icon"
							onClick={() => setEditUserModalActive(false)}
						/>
						<Form>
							<Form.Group controlId="formBasicName">
								<Form.Label>{t('first_name')}</Form.Label>
								<Form.Control
									className="edit_user-input"
									type="text"
									defaultValue={userData.firstName}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											firstName: e.target.value,
										}))
									}
								/>
							</Form.Group>

							<Form.Group controlId="formBasicLastName">
								<Form.Label>{t('last_name')}</Form.Label>
								<Form.Control
									className="edit_user-input"
									type="text"
									defaultValue={userData.lastName}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											lastName: e.target.value,
										}))
									}
								/>
							</Form.Group>

							<Form.Group controlId="formBasicEmail">
								<Form.Label>{t('email')}</Form.Label>
								<Form.Control
									type="email"
									defaultValue={userData.email}
									className="edit_user-input"
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											email: e.target.value,
										}))
									}
								/>
							</Form.Group>

							<Form.Group controlId="formBasicPhone">
								<Form.Label>{t('phone')}</Form.Label>
								<Form.Control
									className="edit_user-input"
									type="text"
									defaultValue={userData.phoneNumber}
									onChange={(e) =>
										setFormData((prev) => ({
											...prev,
											phoneNumber: e.target.value,
										}))
									}
								/>
							</Form.Group>

							<div className="d-flex justify-content-between mt-2">
								<Form.Group controlId="formBasicAddress">
									<Form.Label>{t('street')}</Form.Label>
									<Form.Control
										className="edit_user-input"
										type="text"
										defaultValue={userData.address.street}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: {
													...prev.address,
													street: e.target.value,
												},
											}))
										}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicAddress">
									<Form.Label>{t('house_number')}</Form.Label>
									<Form.Control
										className="edit_user-input"
										type="text"
										defaultValue={userData.address.houseNumber}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: {
													...prev.address,
													houseNumber: e.target.value,
												},
											}))
										}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicAddress">
									<Form.Label>{t('city')}</Form.Label>
									<Form.Control
										className="edit_user-input"
										type="text"
										defaultValue={userData.address.city}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: {
													...prev.address,
													city: e.target.value,
												},
											}))
										}
									/>
								</Form.Group>
								<Form.Group controlId="formBasicAddress">
									<Form.Label>{t('post_index')}</Form.Label>
									<Form.Control
										className="edit_user-input"
										type="text"
										defaultValue={userData.address.postIndex}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												address: {
													...prev.address,
													postIndex: e.target.value,
												},
											}))
										}
									/>
								</Form.Group>
							</div>
							<button type="submit" onClick={(e) => handleChange(e)}>
								{t('save')}
							</button>
						</Form>
					</div>
				</div>
			) : (
				<div className="edit_user--overlay"></div>
			)}
		</>
	);
};
export default EditUser;
