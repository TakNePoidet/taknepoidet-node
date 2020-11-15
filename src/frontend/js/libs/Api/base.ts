import axios, {
	AxiosInstance,
	AxiosPromise,
	AxiosRequestConfig,
	Method
} from 'axios';

export interface RequestSuccess {
	response: 'ok';
}
export interface RequestError {
	response: 'error';
}

export type MethodQuery = Record<string, any>;

export type ApiRequestSuccess<T> = RequestSuccess & T;
export type ApiRequestError = RequestError;

// export type ApiRequest<J> = AxiosPromise<
// 	ApiRequestSuccess<J> | ApiRequestError
// >;


export type ApiRequestResult<J> = ApiRequestSuccess<J> | ApiRequestError;
export type ApiRequestPromise<J> = AxiosPromise<J>;
export type ApiRequest<J> = ApiRequestPromise<J> | ApiRequestResult<J>;

export type Promisify<T> = { [P in keyof T]: T[P] extends (...args: any) => any ? (...agrs: Parameters<T[P]>) => ApiRequestPromise<ReturnType<T[P]>> : any };

class ApiBase {
	protected apiUrl: string;

	protected instance: AxiosInstance;

	constructor() {
		this.apiUrl = process.env.APP_API_URL || '/api';
		this.instance = axios.create({
			baseURL: this.apiUrl,
			timeout: 10000,
			headers: { 'X-Custom-Header': 'foobar' }
		});
	}

	public createAxios<T>(
		methodRequest: Method,
		url: string,
		query = {},
		settings = null
	): AxiosPromise<T> {
		const { apiUrl } = this;
		const axiosParams: AxiosRequestConfig = {
			baseURL: apiUrl,
			method: methodRequest,
			url: `/${url}`
		};
		if (methodRequest === 'post' || methodRequest === 'put') {
			axiosParams.data = query;
		} else {
			axiosParams.params = query;
		}
		if (settings) {
			axiosParams.headers = settings;
		}
		return this.instance(axiosParams);
	}


}
export default ApiBase;
