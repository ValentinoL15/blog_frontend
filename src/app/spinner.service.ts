import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

    private _loading = signal(false);
  readonly loading = this._loading.asReadonly();

    show() {
    this._loading.set(true);
  }

  hide() {
    this._loading.set(false);
  }
}
