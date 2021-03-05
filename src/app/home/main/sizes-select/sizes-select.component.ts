import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectableDirective } from '../../../shared/directives/selectable.directive';

@Component({
  selector: 'app-sizes-select',
  templateUrl: './sizes-select.component.html',
  styleUrls: ['./sizes-select.component.css']
})
export class SizesSelectComponent  {

	@Input() settings: any;
	@Output() sizeSettingsChange: EventEmitter<any> = new EventEmitter();

	onIsSelectedChange($index) {

		//update settings
		this.settings.selectedSizeIndex = $index;

		//emit change
		this.sizeSettingsChange.emit(this.settings.sizeSettings);
	}

}
