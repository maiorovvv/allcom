import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { getFoundUser, loadDefaultUsers, loadLimitedUsers } from '../UserSlice';
import Spinner from '../../../components/Spinner/Spinner';
import Pagination from '../../../components/Pagination/Pagination';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Search from '../../../components/Search/Search';

import SortAZIcon from '../../../img/svg/sortAZ.svg?react';
import SortZAIcon from '../../../img/svg/sortZA.svg?react';

const UsersList: FC = (): JSX.Element => {
	const { t } = useTranslation('users_list');

	const users = useAppSelector((state: RootState) => state.userDate.users);
	const loadingAllUsers = useAppSelector((state: RootState) => state.userDate.loadingAllUsers);
	const limit = useAppSelector((state: RootState) => state.userDate.limit);
	const skip = useAppSelector((state: RootState) => state.userDate.skip);
	const totalItems = useAppSelector((state: RootState) => state.userDate.totalUsers);

	const [confirmationModalActive, setConfirmationModal] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const [userStatus, setUserStatus] = useState<boolean>(false);

	// change after adding endpoint
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const onConfirm = (selection: boolean): void => {};

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadLimitedUsers(0));
	}, []);

	const loadUsersForPage = (skip_count: number): void => {
		dispatch(loadLimitedUsers(skip_count));
	};

	const search = (value: string): void => {
		if (value === '') {
			dispatch(loadDefaultUsers());
		} else {
			dispatch(getFoundUser(value));
		}
	};

	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	// const usersSort = (): void => {
	// }

	if (loadingAllUsers)
		return (
			<div className="text-center">
				<Spinner />
			</div>
		);

	return (
		<>
			<Search search={search} textPlaceholder={t('search_placeholder')} />
			<table className="users_list">
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
						<th className="users_list__item">{t('email')}</th>
						<th className="users_list__item">{t('phone')}</th>
						<th className="users_list__item">{t('address')}</th>
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
								city,
								street,
								houseNumber,
								blocked,
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
										{city}, {street}, {houseNumber}
									</td>
									<td>
										<Tooltip text={t('tooltip_set_status')}>
											<div
												className={`users_list__status
											${blocked ? 'users_list__status--active' : 'users_list__status--blocked'}`}
												onClick={() => {
													setConfirmationModal((prev) => !prev);
													setUserName(`${lastName}, ${firstName}`);
													setUserStatus(blocked);
												}}
											>
												{blocked ? t('activate') : t('block')}
											</div>
										</Tooltip>
									</td>
								</tr>
							)
						)}
				</tbody>
			</table>
			<Pagination
				loadContentForPage={loadUsersForPage}
				limit={limit}
				skip={skip}
				totalItems={totalItems}
			/>
			<ConfirmationModal
				confirmationModalActive={confirmationModalActive}
				setConfirmationModal={setConfirmationModal}
				text={t(`${userStatus ? 'text_activate' : 'text_block'}`)}
				onConfirm={onConfirm}
				name={userName}
			/>
		</>
	);
};

export default UsersList;
