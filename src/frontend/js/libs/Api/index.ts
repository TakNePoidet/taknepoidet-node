
import ApiBase, { ApiRequestPromise, Promisify } from './base';
import social from './methods/Social';
import { ApiSocial, CallSocialApi } from './methods/Social/interface';

export * from './methods/index';

type ApiCallInterface = CallSocialApi;

export interface ApiInterface {
	social: Promisify<ApiSocial>,
}

type ApiCall = [keyof ApiInterface, keyof ApiInterface[keyof ApiInterface]];
type ApiCallMethod<T extends (...args: any) => any> = (method: string, ...params: Parameters<T>) => ApiRequestPromise<ReturnType<T>>;

const apiInstanse = new ApiBase();

const methodsListClass: ApiInterface = { social: social(apiInstanse) };
const api = methodsListClass;
export default api;

export function call<T extends keyof ApiCallInterface>(method: T, ...params: Parameters<ApiCallInterface[T]>): ApiRequestPromise<ReturnType<ApiCallInterface[T]>> {
	const [apiClassName, apiMethod] = method.split('.') as ApiCall;
	const func = methodsListClass[apiClassName][apiMethod] as (...args: any) => any;
	return func.apply(methodsListClass[apiClassName], params ?? []);
}
type ParallelRequestsQueryParams<T, P extends keyof T> = P extends (...args: any) => any ? Parameters<ApiCallMethod<P>> : any;
type ParallelRequests<T> = { [P in keyof T]: ParallelRequestsQueryParams<T, P> };
type ParallelResult<T> = { [P in keyof T]: T[P] extends (...args: any) => any ? ReturnType<T[P]> : any; };
export function parallel<T>(requests: ParallelRequests<T>): Promise<ParallelResult<T>> {
	return new Promise((resolve) => {
		const keys = Object.keys(requests) as Array<keyof T>;
		const result: Partial<ParallelResult<T>> = {};
		const requestsInstans = Object.values(requests).map((item) => {
			const [method, ...params] = item as any;
			return call(method, ...params ?? []);
		});
		Promise.all(requestsInstans).then(res => {
			for (let i = 0; i < res.length; i += 1) {
				result[keys[i]] = res[i].data;
			}
			resolve(result as Required<ParallelResult<T>>);
		});
	});
}
