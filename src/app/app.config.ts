import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideToastr } from 'ngx-toastr';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([spinnerInterceptor,tokenInterceptor])), provideAnimationsAsync(),provideAnimations(), 
    provideToastr()
  ]
};
