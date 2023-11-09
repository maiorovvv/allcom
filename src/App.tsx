import { Route, Routes } from 'react-router-dom';

import NotFound from './components/NotFound/NotFound';
import Products from './features/user/wishProducts/ProductList';
import Layout from './components/Layout';
import Header from './components/Header/Header';
import MyAccount from './components/MyAccount/MyAccount';

function App(): JSX.Element {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Products />} />
					<Route path="user/products" element={<Products />} />

					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Header />
			<MyAccount />
		</>
	);
}

export default App;
