import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Layout from './features/Layout';
import MyAccount from './features/MyAccount/MyAccount';
import ProductDetails from './features/ProductDetails/ProductDetails';
import Shipping from './components/Shipping/Shipping';
import Payment from './components/Payment/Payment';
import Return from './components/Return/Return';
import Support from './components/Support/Support';
import AboutMe from './features/MyAccount/components/AboutMe';
import ChangePassword from './features/MyAccount/components/ChangePassword';
import ProductList from './features/user/wishProducts/ProductList';
import MyAuctions from './features/MyAccount/components/MyAuctions/MyAuctions';
import HomePage from './features/HomePage/HomePage';
import LoginPage from './components/LoginRegisterForgotPassword/LoginPage';
import RegisterPage from './components/LoginRegisterForgotPassword/RegisterPage';
import RestorePassword from './components/LoginRegisterForgotPassword/RestorePassword';
import RestorePasswordWait from './components/LoginRegisterForgotPassword/RestoreUserValidationWait';
import RestoreEnterNewPAssword from './components/LoginRegisterForgotPassword/RestoreEnterNewPAssword';
import UsersList from './features/MyAccount/components/UsersList';
import ProductsList from './features/ProductsList/ProductsList';
import AboutUs from './features/AboutUs/AboutUs';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomePage />} />
					<Route path="user/my_account/" element={<MyAccount />}>
						<Route index element={<AboutMe />} />
						<Route path="products" element={<ProductList />} />
						<Route path="about_me" element={<AboutMe />} />
						<Route path="change_password" element={<ChangePassword />} />
						<Route path="my_auctions" element={<MyAuctions />} />
						<Route path="users_list" element={<UsersList />} />
					</Route>
					<Route path="product/products_list" element={<ProductsList />} />
					<Route path="product/details/" element={<ProductDetails />} />
					<Route path="shipping" element={<Shipping />} />
					<Route path="payment" element={<Payment />} />
					<Route path="return" element={<Return />} />
					<Route path="support" element={<Support />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="restore_password" element={<RestorePassword />} />
					<Route path="restore_password_wait" element={<RestorePasswordWait />} />
					<Route path="restore_password_new" element={<RestoreEnterNewPAssword />} />
					<Route path="about_us" element={<AboutUs />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
