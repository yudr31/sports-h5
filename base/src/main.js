import Vue from 'vue';
import App from './App';
import { router } from './router';
import { Dialog } from 'vant';
import {post,fetch,patch,put} from './http';

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

Vue.use(Dialog);
new Vue({
	router,
	el: '#app',
	render: h => h(App)
});
