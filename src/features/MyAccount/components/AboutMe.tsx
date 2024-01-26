import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import Spinner from '../../../components/Spinner/Spinner';
import { RootState } from '../../../app/store';
import { loadUser } from '../UserSlice';
import UserType from '../types/User';
import PencilIcon from '../../../img/svg/pencil.svg?react';

const AboutMe: FC = (): JSX.Element => {
	const { t } = useTranslation('about_me');

	const [isActiveDetails, setIsActiveDetails] = useState(true);
	const navigate = useNavigate();

	const [handleFirstname, setHandleFirstname] = useState('');
	const [handleLastname, setHandleLastname] = useState('');
	const [handleAddress, setHandleAddress] = useState('');
	const [handleEmail, setHandleEmail] = useState('');

	const loading = useAppSelector((state: RootState) => state.userDate.loading);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const user: UserType | null = useAppSelector((state: RootState) => state.userDate.user);

	useEffect(() => {
		if (user) {
			const {
				firstName = '',
				lastName = '',
				email = '',
				city = '',
				street = '',
				houseNumber = '',
			} = user;

			setHandleFirstname(firstName);
			setHandleLastname(lastName);
			setHandleEmail(email);
			setHandleAddress(`${city}, ${street}, ${houseNumber}`);
		} else {
			navigate('/login');
		}
	}, [user]);

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<div className="about_me">
				<form action="#" className="about_me--inner">
					<label className="about_me--text_style">{t('first_name')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleFirstname}
						disabled={isActiveDetails}
						onChange={(e) => setHandleFirstname(e.target.value)}
						required
					></input>

					<label className="about_me--text_style">{t('last_name')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleLastname}
						disabled={isActiveDetails}
						onChange={(e) => setHandleLastname(e.target.value)}
						required
					></input>
					<label className="about_me--text_style">{t('email')}</label>
					<input
						className="about_me--input"
						type="email"
						value={handleEmail}
						disabled={isActiveDetails}
						onChange={(e) => setHandleEmail(e.target.value)}
						required
					></input>
					<label className="about_me--text_style">{t('address')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleAddress}
						disabled={isActiveDetails}
						onChange={(e) => setHandleAddress(e.target.value)}
						required
					></input>
					<div className="d-flex justify-content-between align-items-center">
						<button className="about_me--btn primary__btn" type="submit">
							{t('submit')}
						</button>
						<PencilIcon
							onClick={() => setIsActiveDetails(!isActiveDetails)}
							className="about_me__pencil"
						/>
					</div>
				</form>
			</div>
		</>
	);
};
export default AboutMe;
