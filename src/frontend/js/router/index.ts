import { createRouter, createWebHistory, RouteMeta } from 'vue-router';
import Home from '../pages/Home.vue';

const layout = 'main';
const routes = [{ path: '/', component: Home, meta: { layout } }];

export interface CustonRouteMeta extends RouteMeta {
	layout: string;
}

export default createRouter({
	history: createWebHistory(),
	routes
});
