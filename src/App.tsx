import NotFound from './features/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App(): JSX.Element {
	return (
		<div>
			<Header />

			<NotFound />
			<Footer />
		</div>
	);
}

export default App;
