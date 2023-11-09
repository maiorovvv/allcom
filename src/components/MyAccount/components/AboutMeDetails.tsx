import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Spinner from '../../Spinner/Spinner';
import { RootState } from '../../../app/store';
import { loadUser } from '../UserSlice';
import User from '../types/User';
import Pensil from '../../../img/pencil.svg';

const AboutMeDetails: FC = (): JSX.Element => {
	const { t } = useTranslation('about_me');
	const loading = useAppSelector((state: RootState) => state.userDate.loading);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const user: User | null = useAppSelector((state: RootState) => state.userDate.user);
	const {
		name: { firstname = '', lastname = '' } = {},
		username = '',
		email = '',
		password = '',
		address: { city = '', street = '', number = '' } = {},
	} = user || {};

	// const [isHiddenPassword, setIsHiddenPassword] = useState<boolean>(true);
	// function generateStars(count: number): string {
	// 	return '*'.repeat(count);
	// }

	if (loading)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<div className="about_me">
			<form action="#" className="about_me--inner">
				<label className="about_me--text_style" htmlFor="acdetails-firstname">
					{t('first_name')}
				</label>
				<input
					className="about_me--input"
					type="text"
					value={firstname}
					id="acdetails-firstname"
					disabled
				></input>
				{Pensil}
				{/* <button onClick={() => }>copy</button> */}

				<label className="about_me--text_style" htmlFor="acdetails-lastname">
					{t('last_name')}
				</label>
				<input
					className="about_me--input"
					type="text"
					value={lastname}
					id="acdetails-lastname"
					disabled
				></input>
				<label className="about_me--text_style" htmlFor="acdetails-displayname">
					{t('user_name')}
				</label>
				<input
					className="about_me--input"
					type="text"
					value={username}
					id="acdetails-displayname"
					disabled
				></input>
				{/* <label className="about_me--text_style" htmlFor="acdetails-email">
					{t('email')}
				</label>
				<input className="about_me--input" type="email" value={email} id="acdetails-email"></input>
				<label className="about_me--text_style" htmlFor="acdetails-password">
					{t('password')}
				</label>
				<input
					className="about_me--input"
					type="password"
					value={password}
					id="acdetails-password"
				></input> */}
				<label className="about_me--text_style" htmlFor="acdetails-address">
					{t('address')}
				</label>
				<input
					className="about_me--input"
					type="text"
					value={`${city}, ${street}, ${number}`}
					id="acdetails-address"
					disabled
				></input>
				<button className="about_me--btn primary__btn" type="submit">
					{t('submit')}
				</button>
			</form>

			{/* commit */}

			{/* <form>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
					></input>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input type="password" className="form-control" id="exampleInputPassword1"></input>
				</div>
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
					<label className="form-check-label" htmlFor="exampleCheck1">
						Check me out
					</label>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form> */}
		</div>
	);
};

export default AboutMeDetails;
