import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
//import 'bootstrap/dist/css/bootstrap.min.css';

bootstrapApplication(AppComponent)
  .catch((err) => console.error(err));
