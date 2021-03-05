import { Injectable } from '@angular/core';
import { Observable,Subject } from "rxjs";
declare var Caman: any;
@Injectable({
  providedIn: 'root'
})
export class ImageFilterService {

  constructor() { }
  private service: any = new Subject();
	public store: Observable<any> = this.service.asObservable();
	private canvas: HTMLCanvasElement

	public updateCanvasReference(payload: HTMLCanvasElement) {
		this.canvas = payload;
	}

	public updateFilter(payload: any) {

		//update filter
		Caman(this.canvas, (caman: any) => {

			//required call when ctx changes outside of CamanJS knowledge
			caman.reloadCanvasData();

			//filter
			caman[payload.method].apply(caman, payload.args).render();

			//notify
			this.service.next();
		});

	}
}
