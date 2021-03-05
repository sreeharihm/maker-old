import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from "rxjs";
import { EditableTextComponent } from '../../home/main/editable-text/editable-text.component';

@Injectable({
  providedIn: 'root'
})
export class EditSettingsService {

  constructor() { }
    private serviceCanvas: any = new BehaviorSubject(null);
    public storeCanvas: Observable<any> = this.serviceCanvas.asObservable();

	//overlays observable
	private serviceOverlays: any = new BehaviorSubject(null);
	public storeOverlays: Observable<any> = this.serviceOverlays.asObservable();

	//edit-text observable
	private serviceEditText: any = new BehaviorSubject(null);
	public storeEditText: Observable<any> = this.serviceEditText.asObservable();

	public updateCanvas() {
		this.serviceCanvas.next();
	}

	public updateOverlays(isClear?: boolean) {
		this.serviceOverlays.next(isClear);
	}

	public updateEditText(editableTextComponent: EditableTextComponent) {
		this.serviceEditText.next(editableTextComponent);
	}

	public processImgUrl(url: any, w: any, h: any) {
		//size args vs ignore for uploaded images
		let appender = url.indexOf('?') > -1 ? '&w=' + w + '&h=' + h : '';
		return url + appender;
	}
}
