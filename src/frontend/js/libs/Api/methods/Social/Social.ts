
import ApiBase, { ApiRequestPromise, Promisify } from '../../base';

import { ApiSocial } from './interface';
import { MethodApiReturnSocialGetAll, MethodApiReturnSocialGetItem, MethodApiSocialGetAll, MethodApiSocialGetItem } from './type';
// type aaa =

// class Social extends ApiGroupBase implements Promisify<ApiSocial> {
// 	protected _prefix = 'social';

// 	protected _validMethods: Array<ValidMethod> = ['getAll', 'getItem'];


// 	getAll(query: MethodApiParamsSocialGetAll = {}, settings: any = null): ApiRequestPromise<MethodApiReturnSocialGetAll> {
// 		return this.api.createAxios('get', `${this._prefix}.getAll`, query, settings);
// 	}

// 	getItem(query = {}, settings: any = null): ApiRequestPromise<MethodApiReturnSocialGetItem> {
// 		return this.api.createAxios('get', `${this._prefix}.getItem`, query, settings);
// 	}
// }
// export type ApiSocialClass = Social;
// export default Social;
// export default handlerProxy<ApiSocialClass>(Social);

// type aa = ;

// type ReturnPromise<T> = { [P in keyof T]: P extends (...args: any) => any ? ApiRequestPromise<P> : any };

// export default function groupMethodSocial(api: ApiBase): {
// 	getAll(query: MethodApiParamsSocialGetAll = {}, settings: any = null): ApiRequestPromise<ReturnType<MethodApiSocialGetAll>>;
// } {
// 	const prefix = 'social';
// 	function getItem(query: MethodApiParamsSocialGetItem, settings: any = null): ApiRequestPromise<MethodApiReturnSocialGetItem> {
// 		return api.createAxios('get', `${prefix}.getItem`, query, settings);
// 	}

// 	function getAll(query: MethodApiParamsSocialGetAll = {}, settings: any = null): ApiRequestPromise<MethodApiReturnSocialGetAll> {
// 		return api.createAxios('get', `${prefix}.getAll`, query, settings);
// 	}
// 	return {
// 		getAll
// 	};
// }

// groupMethodSocial(api).getAll({

// });




export default function groupMethodSocial(api: ApiBase): Promisify<ApiSocial> {
	const prefix = 'social';
	function getAll(...args: Parameters<MethodApiSocialGetAll>): ApiRequestPromise<MethodApiReturnSocialGetAll> {
		const [query, settings] = args;
		return api.createAxios('get', `${prefix}.getAll`, query, settings);
	}
	function getItem(...args: Parameters<MethodApiSocialGetItem>): ApiRequestPromise<MethodApiReturnSocialGetItem> {
		const [query, settings] = args;
		return api.createAxios('get', `${prefix}.getItem`, query, settings);
	}

	return {
		getAll, getItem
	};
}



