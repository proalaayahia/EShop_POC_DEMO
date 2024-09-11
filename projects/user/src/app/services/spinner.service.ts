import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {
    private _isLoading = new BehaviorSubject<boolean>(false);
    public readonly isLoading$ = this._isLoading.asObservable();

    show(): void {
        this._isLoading.next(true);
    }

    hide(): void {
        this._isLoading.next(false);
    }
}