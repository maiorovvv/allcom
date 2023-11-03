import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { HashRouter } from 'react-router-dom';

import App from './App';

import './index.scss';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>
);
