import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);

    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);

    if (exp && now > exp) {
      router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data?.['role'];

    if (requiredRole && payload.role !== requiredRole) {
      router.navigate(['/home']);
      return false;
    }

    return true;

  } catch (e) {
    console.error('Token invalide', e);
    router.navigate(['/login']);
    return false;
  }
};