import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    // Retrieve the JWT token from AuthService
    // const authService = new AuthService(); // Ensure this aligns with how you provide AuthService
    // const authToken = authService.getToken();

    // Clone the request and add the Authorization header
    // const authReq = req.clone({
    //   setHeaders: {
    //     Authorization: authToken ? `Bearer ${authToken}` : ''
    //   }
    // });

    // Pass the cloned request to the next handler
    return next(req);
};