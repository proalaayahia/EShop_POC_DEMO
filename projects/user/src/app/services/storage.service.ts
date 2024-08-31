import { isPlatformBrowser } from "@angular/common";
import { inject, Inject, Injectable, PLATFORM_ID } from "@angular/core";

import { CryptoService } from "./crypto.service";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    /**
     *
     */
    private crypt = inject(CryptoService);
    constructor(@Inject(PLATFORM_ID) private platformId: any) {
    }

    private isBrowser = () => isPlatformBrowser(this.platformId);

    Set = (item: string, data: any) => {
        if (this.isBrowser()) {
            localStorage?.setItem(item, this.crypt.encryptData(JSON.stringify(data)))
        }
    }
    Get = (item: string) => {
        let data = null
        if (this.isBrowser()) {
            if (item in localStorage) {
                data = JSON.parse(this.crypt.decryptData(localStorage?.getItem(item)))
            }
        }
        return data;
    }
    Delete = (item: string) => {
        if (this.isBrowser()) {
            if (item in localStorage) {
                localStorage.removeItem(item)
            }
        }
    }
    Clear=()=>{
        if (this.isBrowser()) {
            localStorage.clear()
        }
    }
}