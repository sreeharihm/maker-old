import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { EditSettingsService } from '../../../shared/services/edit-settings.service';
import { EditableTextComponent } from '../editable-text/editable-text.component';


@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrls: ['./edit-text.component.css']
})
export class EditTextComponent implements OnInit {
	public isShowColors: boolean;
	public isShowFonts: boolean;
	editableTextComponentCurrent: EditableTextComponent;
	@Input() settings: any;
	size: string;
	textColor: string;
	bColor: string;
	color: string;

	constructor(public el: ElementRef, private editSettingsService: EditSettingsService) {
		this.el = el.nativeElement;
	}


	ngOnInit() {
		debugger;
		//subscribe
		this.editSettingsService.storeEditText.subscribe((editableTextComponent) => this.onUpdateEditText(editableTextComponent));
	}

	onUpdateEditText(editableTextComponent: EditableTextComponent) {

		//update check
		if (editableTextComponent && editableTextComponent !== this.editableTextComponentCurrent) {
			
			//update editableTextComponentCurrent
			this.editableTextComponentCurrent = editableTextComponent;

			//update edit controls position
			//this.editableTextComponentCurrent.addEditTextControls(this);
			this.size = this.editableTextComponentCurrent.model.size;
		}

		//clear options
		this.onCloseOptions()
	}

	onShowFontOptions() {
		
		//clear
		this.isShowColors = false;

		//update
		this.isShowFonts = true;
	}

	onUpdateFont(index) {
		this.editableTextComponentCurrent.model.fontIndex = index;
	}

	onToggleBold() {
		this.editableTextComponentCurrent.model.isBold = !this.editableTextComponentCurrent.model.isBold;
	}

	onToggleItalic() {
		this.editableTextComponentCurrent.model.isItalic = !this.editableTextComponentCurrent.model.isItalic;
	}
	onTextColor($event){
		this.editableTextComponentCurrent.model.tColor = $event;
		this.textColor = $event;
	}
	onBackgroundColor($event){
		this.editableTextComponentCurrent.model.bColor = $event;
		this.bColor = $event;
	}
  	onUpdateSize() {
		
		//target
		let sizeIndex = this.editableTextComponentCurrent.model.sizeIndex + 1;

		//cycle target check
		if (sizeIndex > this.settings.textSettings.options.sizes.length - 1) {
			sizeIndex = 0;
		}

		//update
		this.editableTextComponentCurrent.model.sizeIndex = sizeIndex;
	}

	onUpdateWeight() {
		this.editableTextComponentCurrent.model.size = this.size;
	}

	onShowColorOptions() {

		//clear
		this.isShowFonts = false;

		//update
		this.isShowColors = true;
	}

	onUpdateColor(index) {
		this.editableTextComponentCurrent.model.colorIndex = index;
	}

	onUpdateAlign() {

		//target
		let alignIndex = this.editableTextComponentCurrent.model.alignIndex + 1;

		//cycle target check
		if (alignIndex > this.settings.textSettings.options.align.length - 1) {
			alignIndex = 0;
		}

		//update
		this.editableTextComponentCurrent.model.alignIndex = alignIndex;
	}

	onCloseOptions() {

		//clear all
		this.isShowColors = false;
		this.isShowFonts = false;
	}

}
