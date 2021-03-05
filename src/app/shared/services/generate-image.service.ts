import { Injectable } from '@angular/core';
import { Observable,Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GenerateImageService {

  constructor() { }
  private service: any = new Subject();
	public store: Observable<any> = this.service.asObservable();

	public generateImage() {
		this.service.next();
	}
}
