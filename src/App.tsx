import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import Products from './features/user/wishProducts/ProductList';
import SelectLocale from './components/SelectLocale/SelectLocale';
import Header from './components/Header/Header';

function App(): JSX.Element {
	return (
		<>
			<Header />
			<SelectLocale />
			<Products />
			<NotFound />
			<Footer />
		</>
	);
}

export default App;
