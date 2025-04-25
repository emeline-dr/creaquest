import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { LucideAngularModule, ChevronDown, Instagram, Facebook, Mail, Music, Clock, SquarePen, Award, List, Eye, EyeOff, Users, SquareCheck, Square, Circle, CircleCheckBig } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick({
      ChevronDown,
      Instagram,
      Facebook,
      Mail,
      Music,
      Clock,
      SquarePen,
      Award,
      List,
      Eye,
      EyeOff,
      Users,
      Square,
      SquareCheck,
      Circle,
      CircleCheckBig
    }))
  ]
};
