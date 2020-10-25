interface StoreModuleApp {
	isNightTheme: boolean;
}

function state(): StoreModuleApp {
	return {
		isNightTheme: false
	};
}
const getters = {
	isNightTheme(_state: StoreModuleApp) {
		return _state.isNightTheme;
	}
};

const mutations = {
	setNightTheme(_state: StoreModuleApp, payload: boolean): void {
		_state.isNightTheme = payload;
	}
};
export default {
	namespaced: true,
	state,
	getters,
	mutations
};
