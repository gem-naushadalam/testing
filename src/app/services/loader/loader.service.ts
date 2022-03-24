import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader: BehaviorSubject<boolean>;

  constructor() {
    this.showLoader = new BehaviorSubject<boolean>(false);
  }

  setLoader(value: boolean) {
    // console.log('set loader', value);
    this.showLoader.next(value);
  }

  getLoader() {
    return this.showLoader.asObservable();
  }

}