import { Directive } from '@angular/core';

@Directive({
  selector: '[appAppResize]',
  host: {
		'(document: mouseup)': 'onMouseUp($event)'
	}
})
export class AppResizeDirective {

  constructor() { }

}
