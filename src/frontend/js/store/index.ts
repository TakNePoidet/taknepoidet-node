import { createStore } from 'vuex';

import App from './modules/App';

export default createStore({
	modules: {
		app: App
	}
});
