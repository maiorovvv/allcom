import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector, useIsAdmin } from '../../../app/hooks';
import { RootState } from '../../../app/store';
import { getFoundUser, loadDefaultUsers, loadLimitedUsers } from '../UserSlice';
import Spinner from '../../../components/Spinner/Spinner';
import Pagination from '../../../components/Pagination/Pagination';
import ConfirmationModal from '../../../components/ConfirmationModal/ConfirmationModal';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Search from '../../../components/Search/Search';

import SortAZIcon from '../../../img/svg/sortAZ.svg?react';
import SortZAIcon from '../../../img/svg/sortZA.svg?react';
import { selectIsAuthenticated } from '../../auth/selectors';

const UsersList: FC = (): JSX.Element => {
	const { t } = useTranslation('users_list');

	const isAuth = useAppSelector(selectIsAuthenticated);
	const isAdmin = useIsAdmin();
	const users = useAppSelector((state: RootState) => state.userDate.users);
	const totalPages = useAppSelector((state: RootState) => state.userDate.totalPages);
	const numberPage = useAppSelector((state: RootState) => state.userDate.number);
	const loadingAllUsers = useAppSelector((state: RootState) => state.userDate.loadingAllUsers);
	const dispatch = useAppDispatch();

	const [userStatus, setUserStatus] = useState<boolean>(false);
	const [userName, setUserName] = useState<string>('');
	const onConfirm = (selection: boolean): void => {};
	const [confirmationModalActive, setConfirmationModal] = useState<boolean>(false);

	useEffect(() => {
		if (isAuth && isAdmin) {
			dispatch(loadLimitedUsers({ limit: 5, skip: 0 }));
		}
	}, [isAuth]);

	const loadUsersForPage = (skip: number): void => {
		dispatch(loadLimitedUsers({ limit: 5, skip }));
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
			<div className="products_list__container">
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
									address: { street, houseNumber, city, postIndex },
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
											{street} {houseNumber}, {city}, {postIndex}
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
					totalPages={totalPages}
					numberPage={numberPage}
				/>
			</div>
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
