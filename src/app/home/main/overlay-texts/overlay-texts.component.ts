import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { EditSettingsService } from '../../../shared/services/edit-settings.service';
import { MoveClampedToParentDirective } from '../../../shared/directives/move-clamped-to-parent.directive';
import { EditableTextComponent } from '../editable-text/editable-text.component';

@Component({
  selector: 'app-overlay-texts',
  templateUrl: './overlay-texts.component.html',
  styleUrls: ['./overlay-texts.component.css']
})
export class OverlayTextsComponent implements OnInit {

  @ViewChildren(MoveClampedToParentDirective) moveClampedToParents: QueryList<MoveClampedToParentDirective>;
	@ViewChildren(EditableTextComponent) editableTexts: QueryList<EditableTextComponent>;

	@Input() settings: any;

	constructor(private editSettingsService: EditSettingsService,
		private elRef: ElementRef) { }

	ngOnInit() {

		//subscribe
		this.editSettingsService.storeOverlays.subscribe((isClear) => this.onUpdateOverlays(isClear));
		
	}

	setHeightAndWidth(data) {
		this.settings.textSettings.models[data.uniqueId].height = data.height;
		this.settings.textSettings.models[data.uniqueId].width = data.width;
	}

	onUpdateOverlays(isClear: boolean) {

		//update
		if (this.moveClampedToParents) {
			this.moveClampedToParents.forEach(item => item.update());
		}

		//clear currently selected controls
		if(isClear) {

			//update selectedModel helper
			this.settings.selectedModelUniqueId = -1;

			//reset controls
			this.editableTexts.map(item => item.reset());
		}
	}

	onSelected(index) {
		debugger;
		//only one selected overlay at a time
		this.editSettingsService.updateOverlays(true);

		//update selectedModel helper
		this.settings.selectedModelUniqueId = index;

		//update edit text overlay
		let editableTextComponent = this.editableTexts.filter(item =>item.model.uniqueId  === index);
		if(editableTextComponent.length === 1) {
			this.editSettingsService.updateEditText(editableTextComponent[0]);
		}
	}

}
