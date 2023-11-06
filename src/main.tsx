import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';

import { store } from './app/store';

import App from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
