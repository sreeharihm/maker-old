import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EditSettingsService } from 'src/app/shared/services/edit-settings.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { AuthService } from "src/app/shared/services/auth.service";
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  @Input() settings: any;
  @Output() imageSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() textSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() sizeSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() logoSettingsChange: EventEmitter<any> = new EventEmitter();

  @Input() templateSettings: any;
  @Output() templateSet: EventEmitter<any> = new EventEmitter();
  closeResult = '';
  name = 'Your Name';
  footerCopy = 'footer text';
  companyName = 'My Company';
  address = 'Some Details';
  message = 'wishing you a';
  companyLogo = '';
  photo = '';
  phoneNUmber = '(555) 555-1234';
  templateModel: any;
  isClicked= false;
  imageSettings= [];
  settingsForTemplate;
  imageChangedEvent: any = '';
  transform: ImageTransform = {};
  constructor(private editSettingsService: EditSettingsService, private authService: AuthService,
    private modalService: NgbModal) {
      
  }
  setUserData(){
    this.authService.getUsers().then(result => {
      this.name = result.payload.val().displayName;
      this.phoneNUmber = result.payload.val().phoneNo;
      this.photo = result.payload.val().imageData;
      this.footerCopy = result.payload.val().title;
      this.address = result.payload.val().address;
    });
  }
  open(content,uniqueId) { 
    this.setUserData();
    this.settings.selectedImageUniqueId =uniqueId;   
    this.settingsForTemplate = this.templateSettings.filter(data => data.bkId === this.settings.selectedImageUniqueId);
    this.settings.logoSettings.images = this.settings.logoSettings.images.splice(this.settings.logoSettings.images.length);
    this.settings.textSettings.models = this.settings.textSettings.models.splice(this.settings.textSettings.models.length);
    this.logoSettingsChange.emit(this.settings.logoSettings);
    this.textSettingsChange.emit(this.settings.textSettings);
    this.imageSettingsChange.emit(this.settings.imageSettings);
    this.templateModel = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop : 'static'});
  }

  ngOnInit(): void {
   // this.addText();   
   this.settings.isWkFlow =true;
   for(let i=0;i< this.templateSettings.length;i++){
     for(let j=0;j<this.settings.imageSettings.images.length;j++){
       if(this.templateSettings[i].bkId.localeCompare(this.settings.imageSettings.images[j].uniqueId)===0){
         this.imageSettings.push(this.settings.imageSettings.images[j]);
       }
     }
   }
   this.imageSettingsChange.emit(this.settings.imageSettings);
  }

  processImgUrl(url) {
		return this.editSettingsService.processImgUrl(url, 200, 100);
  }

  addText(){
    
      // this.isClicked = !this.isClicked;
      let uniqueId = this.settings.textSettings.models.length;

      this.settingsForTemplate[0].txtModels.forEach((txtModel, index) => {
        if (index == 0) {
          txtModel.type = txtModel.text = this.name;
        } else if (index === 1) {
          txtModel.type = txtModel.text = this.footerCopy;
        } else if (index === 2) {
          txtModel.type = txtModel.text = this.address;
        } else {
          txtModel.type = txtModel.text = this.phoneNUmber;
        }
        txtModel.isSelected = true;
        this.settings.textSettings.models.push(txtModel);
      });
      //update required to trigger change detection
      this.settings.textSettings.models = this.settings.textSettings.models.slice();


      //notify 
      debugger;
      this.logoSettingsChange.emit(this.settings.logoSettings);
      this.textSettingsChange.emit(this.settings.textSettings);      
      this.photo='';
      this.name='';
      this.footerCopy='';
      this.templateModel.close();
  }
  
  onSelectFileChange($event) {
    debugger;
    this.imageChangedEvent = $event;
		//cancel check
		let files = $event.srcElement.files;
		if(files.length > 0) {
      let inputName = $event.currentTarget.name;
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
					this.settingsForTemplate[0].imgModels[0].selectedFile = url;
          //this.settings.logoSettings.images.push(this.settingsForTemplate[0].imgModels[0]);

					//update required to trigger change detection
					this.settings.logoSettings.images = this.settings.logoSettings.images.slice();
										
				}
				//add
				
			};
			reader.readAsDataURL($event.srcElement.files[0]);
		}
	}
  imageCropped(event: ImageCroppedEvent) {
    debugger;
    const img= new Image();
				let height =0;
				let width =0;
				img.src =event.base64 as string;
				img.onload = (e: any) => {
					height =e.path[0].height;
					width = e.path[0].width;
					this.settingsForTemplate[0].imgModels[0].selectedFile = event.base64;
          this.settings.logoSettings.images.push(this.settingsForTemplate[0].imgModels[0]);

					//update required to trigger change detection
					this.settings.logoSettings.images = this.settings.logoSettings.images.slice();
										
				}
  }
  
  onIsSelectedChange($uniqueId) {
    if (this.settings.textSettings.models.length < 6) {
      this.addText();
      this.templateSet.emit(true);
      
      this.imageSettingsChange.emit(this.settings.imageSettings);
      
      this.settings.sizeSettings.selectedSizeIndex = 0;
      this.sizeSettingsChange.emit(this.settings.sizeSettings);
    }
    
	}

}
