import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export function baseurl() {
  return "https://student.gulati.ksesystem.com/public/api/"
}

export function userUrl() {
  return "http://localhost:5000/user/"
}

export function imageurl() {
  return "http://localhost:5000/"
}

const provider = [
  { provide: 'baseurl', useFactory: baseurl, deps: [] },
  { provide: 'userUrl', useFactory: userUrl, deps: [] },
  { provide: 'imageurl', useFactory: imageurl, deps: [] },
]
platformBrowserDynamic(provider).bootstrapModule(AppModule)
  .catch(err => console.error(err));
