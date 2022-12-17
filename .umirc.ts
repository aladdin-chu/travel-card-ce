import { defineConfig } from 'umi';
const { ENV, PROXY } = process.env;
const proxyUrl = '/proxy';
const serverUrl = '';
const publicPath = '//aladdin-chu.github.io/travel-card-ce/';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  hash: true,
  routes: [
    { path: '/', component: '@/pages/index/index' },
    { path: '/result', component: '@/pages/result/index' },
  ],
  define: {
    'process.env.mode': ENV ? 'development' : 'production',
    'process.proxy': PROXY ? proxyUrl : null,
    'process.admin_prefix': ENV ? '' : '',
    'process.server_prefix': ENV ? proxyUrl : serverUrl,
  },
  proxy: PROXY
    ? {
      [`${proxyUrl}`]: {
        target: PROXY,
        changeOrigin: true,
        pathRewrite: {
          [`^${proxyUrl}`]: '',
        },
      },
    }
    : {},
  fastRefresh: {},
  publicPath: ENV ? '/' : publicPath,
  title: '行程卡纪念版',
});
