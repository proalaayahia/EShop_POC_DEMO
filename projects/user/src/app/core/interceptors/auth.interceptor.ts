import { HttpInterceptorFn } from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

import { CryptoService } from "../../services/crypto.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const platformId = inject(PLATFORM_ID);
    const crypt = inject(CryptoService);
    const isBrowser = isPlatformBrowser(platformId);

    const specificEndpoint = '/api/secure/';

    if (req.url.includes(specificEndpoint)) {
        let authToken: string = "";
        if (isBrowser) {
            if ('token' in localStorage) {
                const encryptedToken = localStorage.getItem("token")!;
                authToken = JSON.parse(crypt.decryptData(encryptedToken));
            }
        }

        const authReq = req.clone({
            setHeaders: {
                Authorization: authToken ? `Bearer ${authToken}` : ''
            }
        });

        return next(authReq);
    }

    return next(req);
};
