import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { LucideAngularModule, ChevronDown, Instagram, Facebook, Mail, Music, Clock, SquarePen, Award, List, Eye, EyeOff, Users, SquareCheck, Square, Circle, CircleCheckBig, LoaderCircle, Home, Play, Pause, SkipForward, SkipBack } from 'lucide-angular';

import { provideQuillConfig } from 'ngx-quill';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideQuillConfig({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // Format de texte
          [{ 'header': 1 }, { 'header': 2 }],              // Titres
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],   // Listes
          [{ 'indent': '-1' }, { 'indent': '+1' }],        // Indentation
          [{ 'align': [] }],                               // Alignement
          ['link', 'image', 'video'],                      // Liens et médias
          ['clean']                                        // Supprimer la mise en forme
        ]
      }
    }),
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
      CircleCheckBig,
      LoaderCircle,
      Home,
      Play,
      Pause,
      SkipForward,
      SkipBack
    }))
  ]
};
