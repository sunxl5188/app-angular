import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {hmrBootstrap} from './hmr';

if (environment.production) {
  enableProdMode();
}
laydate.path = 'src/assets/js/laydate/theme/default/laydate.css';
laydate.config.theme = '#39f';
console.log(laydate);

// platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

const hot = 'hot';
if (environment.hmr) {
  if (module[hot]) {
    hmrBootstrap(module, bootstrap);
  } else {
    // 未加上 --hmr 时，控制台会有错误提醒
    console.error('HMR is not enabled for webpack-dev-server!');
    console.log('Are you using the --hmr flag for ng serve?');
  }
} else {
  bootstrap().catch(err => console.error(err));
}
