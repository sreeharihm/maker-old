import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild, QueryList, ViewChildren } from '@angular/core';

declare var _: any;

import { SelectableDirective } from '../../../shared/directives/selectable.directive';

@Component({
  selector: 'app-text-select',
  templateUrl: './text-select.component.html',
  styleUrls: ['./text-select.component.css']
})
export class TextSelectComponent implements AfterViewInit {

	@Input() settings: any;
	@Output() textSettingsChange: EventEmitter<any> = new EventEmitter();
	@ViewChildren(SelectableDirective) selectables: QueryList<SelectableDirective>;

	selectableHeader: SelectableDirective;
	selectableBody: SelectableDirective;
	selectableCaption: SelectableDirective;
	
	canAddQuotes: boolean = false;

	constructor(private changeDetectionRef: ChangeDetectorRef) { }

	ngAfterViewInit() {
		//view sync
		let list = this.selectables.toArray();
		this.selectableHeader = list[0];
		this.selectableBody = list[1];
		this.selectableCaption = list[2];

		//data
		this.selectableHeader.isSelected = this.settings.textSettings.hasHeader;
		this.selectableBody.isSelected = this.settings.textSettings.hasBody;
		this.selectableCaption.isSelected = this.settings.textSettings.hasCaption;
		this.canAddQuotes = this.selectableBody.isSelected;

		//recheck as this.canAddQuotes was checked prior to ngAfterViewInit being called
		this.changeDetectionRef.detectChanges();
	}

	onIsSelected($event,i){
		this.settings.textSettings.models[i].isSelected = !this.settings.textSettings.models[i].isSelected;
		this.textSettingsChange.emit(this.settings.textSettings);
	}
	addText($event){
		let uniqueId = this.settings.textSettings.models.length
		let name = 'text'+uniqueId;
		//add
		this.settings.textSettings.models.push(		
		{ uniqueId: uniqueId, type: name, text: name, fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false, isSelected: false }
		);
		//update required to trigger change detection
		this.settings.textSettings.models = this.settings.textSettings.models.slice();


		//notify
		this.textSettingsChange.emit(this.settings.textSettings);

	}
  clamp(number, lower, upper) {
    if (upper === undefined) {
      upper = lower;
      lower = undefined;
    }
    if (upper !== undefined) {
      upper = parseFloat(upper);
      upper = upper === upper ? upper : 0;
    }
    if (lower !== undefined) {
      lower = parseFloat(lower);
      lower = lower === lower ? lower : 0;
    }
    return this.baseClamp(parseFloat(number), lower, upper);
  } 
  baseClamp(number, lower, upper) {
    if (number === number) {
      if (upper !== undefined) {
        number = number <= upper ? number : upper;
      }
      if (lower !== undefined) {
        number = number >= lower ? number : lower;
      }
    }
    return number;
  }

}

