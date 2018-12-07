import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/goods'
    },
    {
        name: 'info',
        component: () => import('./view/info'),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'user',
        component: () => import('./view/user'),
        meta: {
            title: '用户信息'
        }
    },
    {
        name: 'cart',
        component: () => import('./view/cart'),
        meta: {
            title: '球场信息'
        }
    },
    {
        name: 'login',
        component: () => import('./view/login'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'address',
        component: () => import('./view/address'),
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'booking',
        component: () => import('./view/booking'),
        meta: {
            title: '订场设置'
        }
    },
    {
        name: 'rule',
        component: () => import('./view/rule'),
        meta: {
            title: '规则列表'
        }
    },
    {
        name: 'notice',
        component: () => import('./view/notice'),
        meta: {
            title: '通知设置'
        }
    },
    {
        name: 'account',
        component: () => import('./view/account'),
        meta: {
            title: '账号设置'
        }
    },
    {
        name: 'order',
        component: () => import('./view/order'),
        meta: {
            title: '订单列表'
        }
    }
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export  {
    router
};
