/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth-interceptor.service';

/** Http interceptor providers in outside-in order */
/**
 * As you create new interceptors, add them to the httpInterceptorProviders array and you won't have to revisit the AppModule.
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];