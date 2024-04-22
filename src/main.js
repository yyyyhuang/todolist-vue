import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './routers';
import 'ant-design-vue/dist/reset.css';

import store from './store';

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Antd).mount('#app');

