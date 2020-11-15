import { MethodApiSocialGetAll, MethodApiSocialGetItem } from './type';

export interface ModelSocialItem {
	key: string;
	link: string;
	nik: string;
	name: string;
	types: Array<'social' | 'messenger' | 'email' | 'work' | 'phone'>;
}


export interface MethodApiParamsSocialGetAll {
	count?: number,
	offset?: number,
}

export interface MethodApiParamsSocialGetItem {
	key: string;
}

export interface ApiSocial {
	getAll: MethodApiSocialGetAll;
	getItem: MethodApiSocialGetItem;
}

export interface CallSocialApi {
	'social.getAll': MethodApiSocialGetAll;
	'social.getItem': MethodApiSocialGetItem;
}

