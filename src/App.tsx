import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Home from './features/products/Products';
import Layout from './components/Layout';
import MyAccount from './components/MyAccount/MyAccount';
import ProductDetails from './components/ProductDetails/ProductDetails';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="user/my_account/*" element={<MyAccount />} />
					<Route path="product/details/" element={<ProductDetails />} />

					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
