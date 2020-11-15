import {
	RouteLocation,
	RouteLocationNormalized,
	RouteParams as RouteParamsVue
} from 'vue-router';

interface QueryParam {
	name: string;
	required: boolean;
	default: number | string | boolean;
	type: NumberConstructor | StringConstructor | BooleanConstructor;
}

type QueryParams = QueryParam[];

interface RouteParam {
	name: string;
	computed(params: RouteParamsVue): void;
}
type RouteParams = RouteParam[];
type State = Record<string, unknown>;
type Variables = Record<string, unknown>;
interface ConstructorParams {
	defaultState: Record<string, unknown>;
	addVariablesState: string[];
	loadVariablesState: string[];
	queryParams: QueryParams;
	pouteParams: RouteParams;
}

export default class LoadDataVueRoute {
	private defaultState: State;

	private addVariablesState: string[];

	private loadVariablesState: string[];

	private queryParams: QueryParams;

	private pouteParams: RouteParams;

	private variables: Variables = {};

	constructor(params: Partial<ConstructorParams> = {}) {
		this.defaultState = params.defaultState || {};
		this.addVariablesState = params.addVariablesState || [];
		this.loadVariablesState = params.loadVariablesState || [];
		this.queryParams = params.queryParams || [];
		this.pouteParams = params.pouteParams || [];
	}

	variablesBeforeRoute({ to }: { to: RouteLocationNormalized }): Variables {
		this.variables = {};
		let variables: Variables = {};
		this.loadVariablesState.forEach((item: string) => {
			variables[item] = this.defaultState[item];
		});
		variables = this.getVariablesRoute(variables, to);
		return variables;
	}

	getVariablesRoute(variables: Variables, route: RouteLocation): Variables {
		this.pouteParams.forEach((item) => {
			let nameParams;
			let valueParams;
			if (typeof item === 'object') {
				nameParams = item.name;
				valueParams = item.computed(route.params);
			} else {
				nameParams = item;
				valueParams = route.params[item];
			}
			variables[nameParams] = valueParams;
		});
		this.queryParams.forEach((item) => {
			const nameParams = item.name;
			const valueParams = route.query[nameParams];
			if (item.required === false) {
				if (typeof valueParams !== 'undefined') {
					variables[nameParams] = valueParams;
				} else {
					variables[nameParams] = item.default;
				}
			} else {
				variables[nameParams] = valueParams;
			}
			if (item.type) {
				if (item.type === Number && typeof valueParams !== 'number') {
					variables[nameParams] = parseInt(variables[nameParams] as string, 10);
				}
			}
		});
		return variables;
	}
}
