import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import Spinner from '../../Spinner/Spinner';
import { RootState } from '../../../app/store';
import { loadUser } from '../UserSlice';
import User from '../types/User';
import PencilIcon from '../../../img/svg/pencil.svg?react';

const AboutMeDetails: FC = (): JSX.Element => {
	const { t } = useTranslation('about_me');

	const loading = useAppSelector((state: RootState) => state.userDate.loading);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const user: User | null = useAppSelector((state: RootState) => state.userDate.user);

	const [isActiveDetails, setIsActiveDetails] = useState(true);

	const [handleFirstname, setHandleFirstname] = useState('');
	const [handleLastname, setHandleLastname] = useState('');
	const [handleUsername, setHandleUsername] = useState('');
	const [handleDateOfBirth, setHandleDateOfBirth] = useState('');
	const [handleAddress, setHandleAddress] = useState('');
	const [handleEmail, setHandleEmail] = useState('');

	useEffect(() => {
		if (user) {
			const {
				name: { firstname = '', lastname = '' } = {},
				username = '',
				email = '',
				address: { city = '', street = '', number = '' } = {},
			} = user;

			setHandleFirstname(firstname);
			setHandleLastname(lastname);
			setHandleUsername(username);
			setHandleEmail(email);
			setHandleAddress(`${city}, ${street}, ${number}`);
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
			{/* <h2 className="my_account__content--title h3 mb-20">{t('about_me')}</h2> */}
			<div className="about_me">
				<form action="#" className="about_me--inner">
					<label className="about_me--text_style">{t('first_name')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleFirstname}
						id="acdetails-firstname"
						disabled={isActiveDetails}
						onChange={(e) => setHandleFirstname(e.target.value)}
					></input>

					<label className="about_me--text_style">{t('last_name')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleLastname}
						id="acdetails-lastname"
						disabled={isActiveDetails}
						onChange={(e) => setHandleLastname(e.target.value)}
					></input>
					<label className="about_me--text_style">{t('user_name')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleUsername}
						id="acdetails-displayname"
						disabled={isActiveDetails}
						onChange={(e) => setHandleUsername(e.target.value)}
					></input>
					<label className="about_me--text_style">{t('date_of_birth')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleDateOfBirth}
						id="acdetails-displayname"
						disabled={isActiveDetails}
						onChange={(e) => setHandleDateOfBirth(e.target.value)}
					></input>
					<label className="about_me--text_style">{t('email')}</label>
					<input
						className="about_me--input"
						type="email"
						value={handleEmail}
						id="acdetails-email"
						disabled={isActiveDetails}
						onChange={(e) => setHandleEmail(e.target.value)}
					></input>
					<label className="about_me--text_style">{t('address')}</label>
					<input
						className="about_me--input"
						type="text"
						value={handleAddress}
						id="acdetails-address"
						disabled={isActiveDetails}
						onChange={(e) => setHandleAddress(e.target.value)}
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

export default AboutMeDetails;
