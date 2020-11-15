import LayoutGridHelper from 'layout-grid-helper';
import { createApp } from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';
import '@style';


const app = createApp(App).use(store).use(router);
app.mount('#app');

const gridHelper = LayoutGridHelper({
	prefix: 'gh',
	sides: '16px',
	gutter: '16px',
	columns: 4,
	responsible: {
		470: {
			container: '470px',
			gutter: '16px',
			sides: '16px',
			columns: 4
		},
		576: {
			container: '576px',
			columns: 6
		},
		640: {
			container: '640px',
			columns: 6
		},
		960: {
			container: '960px',
			columns: 10
		},
		1300: {
			container: '1300px',
			columns: 12,
			gutter: '20px',
			sides: '20px'
		},
		1690: {
			container: '1690px',
			columns: 12
		}
	}
});
gridHelper.init();



// api.social.getAll().then(({ data }) => {
// 	if (data.response === 'ok') {
// 		console.log(data.items[0].link);
// 	}
// });

// call('social.getItem', { key: 'vk' }).then(({ data }) => {
// 	if (data.response === 'ok') {
// 		console.log(data.item.link);
// 	}
// });
// Promise.all([
// 	call('social.getItem', { key: 'vk' })
// ]).then(res => {
// 	if (res[0].data.response === "ok") {
// 		console.log(res[0].data.item.name);
// 	}
// });


