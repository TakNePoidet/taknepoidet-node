
// import ApiGroupBase from './methods';

// export default function handlerProxy<T extends ApiGroupBase>(className: new (...args: any[]) => T): new (...args: any[]) => T {
// 	return new Proxy(className, {
// 		construct(Target, agrs: any[]) {
// 			return new Proxy(new Target(...agrs) as T, {
// 				get(target: T, prop: string) {
// 					if (prop.startsWith('_')) {
// 						throw new Error('Access denied');
// 					}
// 					if (!target._validMethods.includes(prop) && prop !== 'api') {
// 						throw new Error('Methods not found');
// 					}
// 					const value = Reflect.get(target, prop);

// 					return typeof value === 'function' ? value.bind(target) : Reflect.get(target, prop);
// 				}
// 			});
// 		}
// 	});
// }