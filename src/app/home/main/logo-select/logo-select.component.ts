import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EditSettingsService } from '../../../shared/services/edit-settings.service';

@Component({
  selector: 'app-logo-select',
  templateUrl: './logo-select.component.html',
  styleUrls: ['./logo-select.component.css']
})
export class LogoSelectComponent  {

	@Input() settings: any;
	@Output() logoSettingsChange: EventEmitter<any> = new EventEmitter();

	constructor(private editSettingsService: EditSettingsService) { 
	}

	onVisibilityToggle() {
		this.settings.logoSettings.isGraphicHidden = !this.settings.logoSettings.isGraphicHidden;
		this.logoSettingsChange.emit(this.settings.logoSettings);
	}
	onRemove() {
		this.settings.logoSettings.selectedFile = null;
		this.settings.logoSettings.isGraphicHidden = false;
		this.logoSettingsChange.emit(this.settings.logoSettings);
	}
	processImgUrl(url) {
		return this.editSettingsService.processImgUrl(url, 200, 100);
	}

	onIsSelectedChange($uniqueId) {
		this.settings.logoSettings.images[$uniqueId].isGraphicHidden = !this.settings.logoSettings.images[$uniqueId].isGraphicHidden		
		this.logoSettingsChange.emit(this.settings.logoSettings);
	}

	deleteImage(id) {
		this.settings.logoSettings.images.forEach( (item, index) => {
			if(item.uniqueId === id) this.settings.logoSettings.images.splice(index,1);
		});
	}

	onSelectFileChange($event) {		
		//cancel check
		let files = $event.srcElement.files;
		if(files.length > 0) {

			//base64 encode file (TODO extract to a service)
			let reader = new FileReader();
			reader.onload = (e) => {
				let url = (<FileReader>e.target).result;
				let file = { url: url, name: 'Uploaded Image' };

				//this.logoSettings.selectedFile = file;
				let uniqueId = this.settings.logoSettings.images.length
				const img= new Image();
				let height =0;
				let width =0;
				img.src = e.target.result as string;
				img.onload = (e: any) => {
					height =e.path[0].height;
					width = e.path[0].width;
					this.settings.logoSettings.images.push(				
						{ uniqueId:uniqueId, isGraphicHidden: false,url: url,selectedFile: url,size: 50,radius: 0,height: height,width:width,isSelected: true, left: 100, top: 100}
					);

					//update required to trigger change detection
					this.settings.logoSettings.images = this.settings.logoSettings.images.slice();

					//default to newly uploaded image
					this.settings.logoSettings.selectedImageUniqueId = uniqueId;

					this.logoSettingsChange.emit(this.settings.logoSettings);					
				}
				//add
				
			};
			reader.readAsDataURL($event.srcElement.files[0]);
		}
	}


}
