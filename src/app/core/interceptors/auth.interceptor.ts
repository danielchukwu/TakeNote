import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private dataSharingService: DataSharingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Exempted Routes
    const exemptedRoutes = ['/authenticate', '/register'];
    
    if ( exemptedRoutes.some((exemptedRoute) => {request.url.endsWith(exemptedRoute)}) ) {
      return next.handle(request);
    }
    
    // Users authentication token
    const usersToken = this.authService.getToken();

    // Add token to new request
    const newReq = request.clone({
      setHeaders: {Authorization: `Bearer ${usersToken}`}
    })
    
    return next.handle(newReq)
  }
}
