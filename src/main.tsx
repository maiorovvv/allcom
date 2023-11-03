import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from './app/store';
import './i18n';

import App from './App';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
