import { ApiRequestResult } from '../../base';
import { CallSocialApi, MethodApiParamsSocialGetAll, MethodApiParamsSocialGetItem, ModelSocialItem } from './interface';

export type MethodApiReturnSocialGetAll = ApiRequestResult<{ items: ModelSocialItem[]; }>;
export type MethodApiReturnSocialGetItem = ApiRequestResult<{ item: ModelSocialItem; }>;

export type MethodApiSocialGetAll = (query?: MethodApiParamsSocialGetAll, settings?: any) => MethodApiReturnSocialGetAll;
export type MethodApiSocialGetItem = (query: MethodApiParamsSocialGetItem, settings?: any) => MethodApiReturnSocialGetItem;

export type CallStringSocialApi = keyof CallSocialApi;