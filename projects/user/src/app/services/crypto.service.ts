import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private key:string= '3sffg*h^FHJIKEh67897md7AfEz'
  constructor() { }

  encryptData(data: any) {
    // Encrypt
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString();
  }

  decryptData(data: any) {
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(data, this.key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
