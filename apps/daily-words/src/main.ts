import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// if (process.env['NODE_ENV'] === 'production') {
//   enableProdMode();
// }

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
