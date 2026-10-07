/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector, useIsAdmin } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { changeBlockedStatus, changeCheckedStatus, findUserById, loadAllUsers } from '../UserSlice';
import Spinner from '../../../components/Spinner/Spinner';
import Pagination from '../../../components/Pagination/Pagination';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Search from '../../../components/Search/Search';
import { selectIsAuthenticated } from '../../auth/selectors';

import SortAZIcon from '../../../img/svg/sortAZ.svg?react';
import SortZAIcon from '../../../img/svg/sortZA.svg?react';
import EditUser from './EditUser';

interface UserData {
	id: number;
	user_name: string;
	status: boolean;
}

const UsersList: FC = (): JSX.Element => {
	const { t } = useTranslation('users_list');

	const dispatch = useAppDispatch();

	const isAuth = useAppSelector(selectIsAuthenticated);
	const isAdmin = useIsAdmin();
	const users = useAppSelector((state: RootState) => state.userData.users);
	const totalPages = useAppSelector((state: RootState) => state.userData.totalPages);
	const numberPage = useAppSelector((state: RootState) => state.userData.number);
	const loadingAllUsers = useAppSelector((state: RootState) => state.userData.loadingAllUsers);

	const [confirmationModalActive, setConfirmationModal] = useState<boolean>(false);
	const [editUserModalActive, setEditUserModalActive] = useState<boolean>(false);
	const [userData, setUserData] = useState<UserData>({} as UserData);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const onConfirm = (selection: boolean): void => {
		if (selection) {
			dispatch(changeBlockedStatus({ user_id: userData.id, status: userData.status }));
		}
	};

	useEffect(() => {
		if (isAuth && isAdmin) {
			dispatch(loadAllUsers({ limit: 5, skip: 0 }));
		}
	}, [isAuth]);

	const loadUsersForPage = (skip: number): void => {
		dispatch(loadAllUsers({ limit: 5, skip }));
	};

	const setCheckedStatus = (user_id: number, status: boolean): void => {
		dispatch(changeCheckedStatus({ user_id, status }));
	};

	const search = (value: string): void => {};

	if (loadingAllUsers)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<div className="users_list__container">
				<Search search={search} textPlaceholder={t('search_placeholder')} />
				<table className="users_list__table">
					<thead>
						<tr>
							<th className="users_list__item">
								<div
									className=" users_list__item--name"
									onClick={() => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
								>
									{t('name')}
									<div className="users_list__item--name__sort_icon">
										{sortOrder === 'asc' ? <SortAZIcon /> : <SortZAIcon />}
									</div>
								</div>
							</th>
							<th className="users_list__item--email">{t('email')}</th>
							<th className="users_list__item--phone">{t('phone')}</th>
							<th className="users_list__item--address">{t('address')}</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map(
								({
									id,
									firstName,
									lastName,
									email,
									phoneNumber,
									address: { street, houseNumber, city, postIndex },
									blocked,
									checked,
								}) => (
									<tr className="users_list__info" key={id}>
										<td className="users_list__info--name">
											{lastName}, {firstName}
										</td>
										<td>
											<a href={`mailto:${email}`}>{email}</a>
										</td>
										<td>
											<a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
										</td>
										<td>
											{street} {houseNumber}, {city}, {postIndex}
										</td>
										<td className="users_list__edit">
											<Tooltip text={t('change_placeholder')}>
												<div
													className="users_list__edit--btn"
													onClick={() => {
														dispatch(findUserById(id));
														setEditUserModalActive((prev) => !prev);
													}}
												>
													{t('change')}
												</div>
											</Tooltip>
										</td>
										<td className="users_list__info--status">
											<Tooltip text={t('tooltip_set_status')}>
												<div
													className={`users_list__status
											${blocked ? 'users_list__status--active' : 'users_list__status--blocked'}`}
													onClick={() => {
														setConfirmationModal((prev) => !prev);
														setUserData({
															id,
															user_name: `${lastName}, ${firstName}`,
															status: !blocked,
														});
													}}
												>
													{blocked ? t('activate') : t('block')}
												</div>
											</Tooltip>
										</td>
										{checked === false && (
											<td className="users_list__info--status">
												<Tooltip text={t('tooltip_set_checked_status')}>
													<div
														className="users_list__status users_list__status--confirm_user"
														onClick={() => {
															setCheckedStatus(id, !checked);
														}}
													>
														{t('confirm_user')}
													</div>
												</Tooltip>
											</td>
										)}
									</tr>
								)
							)}
					</tbody>
				</table>
				<Pagination
					loadContentForPage={loadUsersForPage}
					totalPages={totalPages}
					numberPage={numberPage}
				/>
			</div>
			<ConfirmationModal
				confirmationModalActive={confirmationModalActive}
				setConfirmationModal={setConfirmationModal}
				text={t(`${userData.status ? 'text_block' : 'text_activate'}`)}
				onConfirm={onConfirm}
				value={userData.user_name}
			/>
			<EditUser
				editUserModalActive={editUserModalActive}
				setEditUserModalActive={setEditUserModalActive}
			/>
		</>
	);
};

export default UsersList;
