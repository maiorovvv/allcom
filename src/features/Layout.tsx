import { FC, useEffect } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUser } from './MyAccount/UserSlice';
import { RootState } from '../app/store';

const Layout: FC = (): JSX.Element => {
	const token = useAppSelector((state: RootState) => state.auth.token);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (token) {
			dispatch(loadUser());
		}
	}, [token]);
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layout;
