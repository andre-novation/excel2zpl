import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'xls2zpl',
        appId: '1:304605950452:web:e56643e1d36cafcdc209a1',
        storageBucket: 'xls2zpl.firebasestorage.app',
        apiKey: 'AIzaSyCG7jPW1zszUty8_aVf0tiRmnWMAbnqwKM',
        authDomain: 'xls2zpl.firebaseapp.com',
        messagingSenderId: '304605950452',
        measurementId: 'G-MNNZ107BNX',
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    MessageService,
  ],
};
