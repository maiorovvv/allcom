import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Home from './features/products/Products';
import Layout from './components/Layout';
import MyAccount from './components/MyAccount/MyAccount';
import ProductDetails from './features/ProductDetails/ProductDetails';
import Shipping from './components/Shipping/Shipping';
import Payment from './components/Payment/Payment';
import Return from './components/Return/Return';
import Support from './components/Support/Support';
import AboutMe from './components/MyAccount/components/AboutMe';
import ChangePassword from './components/MyAccount/components/ChangePassword';
import ProductList from './features/user/wishProducts/ProductList';
import MyAuctions from './components/MyAccount/components/MyAuctions/MyAuctions';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="user/my_account/" element={<MyAccount />}>
						<Route index element={<AboutMe />} />
						<Route path="products" element={<ProductList />} />
						<Route path="about_me" element={<AboutMe />} />
						<Route path="change_password" element={<ChangePassword />} />
						<Route path="my_auctions" element={<MyAuctions />} />
					</Route>
					<Route path="product/details/" element={<ProductDetails />} />
					<Route path="shipping" element={<Shipping />} />
					<Route path="payment" element={<Payment />} />
					<Route path="return" element={<Return />} />
					<Route path="support" element={<Support />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
