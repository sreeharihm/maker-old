import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EditSettingsService } from 'src/app/shared/services/edit-settings.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { AuthService } from "src/app/shared/services/auth.service";
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  rotateValue: number = 0;
  rotateSliderOptions: Options = {
    floor: 0,
    ceil: 360
  };
  zoomValue = 0;
  zoomSliderOptions: Options = {
    floor: 0,
    ceil: 10
  }
  display = 'none';
  @Input() settings: any;
  @Output() imageSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() textSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() sizeSettingsChange: EventEmitter<any> = new EventEmitter();
  @Output() logoSettingsChange: EventEmitter<any> = new EventEmitter();

  @Input() templateSettings: any;
  @Output() templateSet: EventEmitter<any> = new EventEmitter();

  public fields: any[] = [];
  
  public originalImage: string;
  public croppedImage: string='';
  public currentId: string='';
  public uploadedFiles: any[]=[];
  public form: FormGroup;
  public currentimgWidth: number=0;

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
      this.getUserData();   
  }
  getUserData(){
    this.authService.getUsers().then(result => {
      this.name = result.payload.val().displayName;
      this.phoneNUmber = result.payload.val().phoneNo;
      this.photo = result.payload.val().imageData;
      this.footerCopy = result.payload.val().title;
      this.address = result.payload.val().address;
    });
  }

  setUserData(type){
    switch(type){
      case "name":
        return this.name;
      case "footercopy":
        return this.footerCopy; 
      case "photo":
        return this.photo;
      case "address":
        return this.address;  
      case "phonenumber":
        return this.phoneNUmber;    
      default:
        return "";  
    }
  }

  onCloseHandled() {
    this.display = 'none'
  }
  open(content,uniqueId) { 
    this.getUserData();  
    this.uploadedFiles=[];
    this.originalImage='';

    this.settings.selectedImageUniqueId =uniqueId;   
    this.settingsForTemplate = this.templateSettings.filter(data => data.bkId === this.settings.selectedImageUniqueId);
    this.fields=[]
    let txts = this.settingsForTemplate[0].txtModels;
    if(txts.length > 0){
      for(let i=0;i< txts.length;i++){
        let fieldConfig = {
          value: this.setUserData(txts[i].type),
          key: txts[i].type,
          uniqueId: txts[i].uniqueId,
          label: txts[i].label,        
          type: "text",
        };
        this.fields.push(fieldConfig);
      }
    }
    let imgs = this.settingsForTemplate[0].imgModels;
    if(imgs.length > 0){
      for(let i=0;i< imgs.length;i++){
        let fieldConfig = {
          value: '',
          key: imgs[i].type,
          uniqueId: imgs[i].uniqueId,
          label: imgs[i].text, 
          type: "file",    
          width: txts[i].width,
          onUpload: this.onUpload.bind(this)
        };
        this.fields.push(fieldConfig);
        let file = {imgid: imgs[i].uniqueId,label: imgs[i].text,width: imgs[i].width,
          imgValue: this.setUserData(imgs[i].type)};
        if(file.imgValue.length>0){          
          this.uploadedFiles.push(file);
        }
      }
    }
    if(imgs.length==1){
      this.currentId = imgs[0].uniqueId;
      this.currentimgWidth = imgs[0].width;
    }
    let fieldsCtrls = {};
    for (let f of this.fields) {      
      fieldsCtrls[f.uniqueId] = new FormControl(f.value || '')   
    }
    this.form = new FormGroup(fieldsCtrls);

    this.settings.logoSettings.images = this.settings.logoSettings.images.splice(this.settings.logoSettings.images.length);
    this.settings.textSettings.models = this.settings.textSettings.models.splice(this.settings.textSettings.models.length);
    this.logoSettingsChange.emit(this.settings.logoSettings);
    this.textSettingsChange.emit(this.settings.textSettings);
    this.imageSettingsChange.emit(this.settings.imageSettings);
    this.templateModel = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop : 'static', size: 'xl'});
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

  onZoom(event) {

  }
  onUpload(e,id,text,width) {
    let reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file); 
      reader.onload = () => {
        var img = reader.result;
        this.form.get(id).setValue(img);
        var item = this.uploadedFiles.findIndex(e=>e.imgid === id);
        if(item===-1){
        let file = {imgid: id,label: text,width: width,
          imgValue: img};
        this.uploadedFiles.push(file);
        }
        else{
          this.uploadedFiles[item].imgValue = img;
        }
      };
    }
  }

  cropImage(id){
    let cc = this.uploadedFiles.filter(e =>e.imgid === id);
    this.originalImage = cc[0].imgValue;
    this.currentId =id;
    this.currentimgWidth= cc[0].width; 
    this.display = 'block';
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var index = this.uploadedFiles.findIndex(e=>e.imgid === this.currentId);
    this.uploadedFiles[index].imgValue = this.croppedImage;
  }

  processImgUrl(url) {
		return this.editSettingsService.processImgUrl(url, 200, 100);
  }

  addText(){    
    // this.isClicked = !this.isClicked;
    let data = this.form.value;
    this.settingsForTemplate[0].txtModels.forEach((txtModel, index) => {
      txtModel.text = data[txtModel.uniqueId];
      txtModel.isSelected = true;
      this.settings.textSettings.models.push(txtModel);
    });

    this.settingsForTemplate[0].imgModels.forEach((imgModels, index) => {   
      var imgIndex = this.uploadedFiles.findIndex(e=>e.imgid === imgModels.uniqueId);
      if(imgIndex!=-1){
      imgModels.selectedFile = this.uploadedFiles[imgIndex].imgValue;   
      this.settings.logoSettings.images.push(imgModels);
      }
    });

    //update required to trigger change detection
    this.settings.textSettings.models = this.settings.textSettings.models.slice();      
    this.settings.logoSettings.images = this.settings.logoSettings.images.slice();
      //notify 
    this.logoSettingsChange.emit(this.settings.logoSettings);
    this.textSettingsChange.emit(this.settings.textSettings);    
    
    this.getUserData();  
    this.uploadedFiles=[];
    /* this.photo='';
    this.name='';
    this.footerCopy=''; */
    this.templateModel.close();
  }
  
  onSelectFileChange($event) {
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
  /* imageCropped(event: ImageCroppedEvent) {
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
   */
  onIsSelectedChange($uniqueId) {
    if (this.settings.textSettings.models.length < 6) {
      this.addText();
      this.templateSet.emit(true);
      
      this.imageSettingsChange.emit(this.settings.imageSettings);
      
      this.settings.sizeSettings.selectedSizeIndex = 0;
      this.sizeSettingsChange.emit(this.settings.sizeSettings);
    }
    
	}

  transformImage(prop) {
    if(prop === 1) {
      this.transform = {
        ...this.transform,
        rotate: this.rotateValue
      };
    } else if (prop === 2) {
      this.transform = {
        ...this.transform,
        scale: this.zoomValue
      };
    }
  }
  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

}
