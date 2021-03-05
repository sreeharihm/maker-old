import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditSettingsService } from '../../../shared/services/edit-settings.service';
import { SelectableDirective } from '../../../shared/directives/selectable.directive';
import { IndexOfPipe } from '../../../shared/pipes/index-of.pipe';
@Component({
  selector: 'app-image-select',
  templateUrl: './image-select.component.html',
  styleUrls: ['./image-select.component.css']
})
export class ImageSelectComponent {

  @Input() settings: any;
  @Output() imageSettingsChange: EventEmitter<any> = new EventEmitter();

	constructor(private editSettingsService: EditSettingsService) { }

	onIsSelectedChange($uniqueId) {
		this.settings.isWkFlow =false;
		//update settings
		this.settings.selectedImageUniqueId = $uniqueId;

		//emit change
		this.imageSettingsChange.emit(this.settings.imageSettings);
	}

	processImgUrl(url) {
		return this.editSettingsService.processImgUrl(url, 200, 100);
	}

	onSelectFileChange($event) {

		//cancel check
		let files = $event.srcElement.files;
		if (files.length > 0) {

			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				let url = (<FileReader>e.target).result;
				let uniqueId = this.settings.imageSettings.images.length

				//add
				this.settings.imageSettings.images.push({ url: url, name: 'Uploaded Image at ' + Date.now(), uniqueId: uniqueId });

				//update required to trigger change detection
				this.settings.imageSettings.images = this.settings.imageSettings.images.slice();

				//default to newly uploaded image
				this.settings.imageSettings.selectedImageUniqueId = uniqueId;

				//notify
				this.imageSettingsChange.emit(this.settings.imageSettings);
			};
			reader.readAsDataURL($event.srcElement.files[0]);
			
		}
	}

	onKeyUp($event) {
		this.settings.imageSettings.filterQuery = $event.target.value;
	}
}
