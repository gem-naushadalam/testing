import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
    ifVertical: boolean = true;

    setVertical(data: boolean){
       this.ifVertical = data;
    }
}