import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  public uploadedFiles: any[]=[];
  public form: FormGroup;
  public originalImage: string;
  public croppedImage: string='';
  public currentId: string='';
  public fields: any[] = [
    {
      value: '',
      key: 'name',
      uniqueId: 'bk1',
      label: 'Name',        
      type: "text",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',
    },
    {
      value: '',
      key: 'footercopy',
      uniqueId: 'bk2',
      label: 'Footer copy',        
      type: "text",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',
    },
    {
      value: '',
      key: 'address',
      uniqueId: 'bk3',
      label: 'Address',        
      type: "text",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',
    },
    {
      value: '',
      key: 'phonenumber',
      uniqueId: 'bk4',
      label: 'Phone Number',        
      type: "text",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',
    },
    {
      value: '',
      key: 'photo',
      uniqueId: 'bk5',
      label: 'Photo',        
      type: "file",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',      
      onUpload: this.onUpload.bind(this)
    },
    {
      value: '',
      key: 'h1',
      uniqueId: 'bk6',
      label: 'H1',        
      type: "file",
      left: 10,
      top: 10, 
      height: 10,
      width: 10,
      isGraphicHidden: false,
      isSelected: false,   
      selectedFile: '',
      fontIndex: 0,
      colorIndex: 0,
      alignIndex: 0,       
      sizeIndex: 0, 
      isBold: false,
      isItalic: false,
      fontSize: 20,
      tColor: '',
      bColor: '',      
      onUpload: this.onUpload.bind(this)
    }
  ];
  constructor() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
   }

  ngOnInit(): void {
    let fieldsCtrls = {};
    for (let f of this.fields) {      
      fieldsCtrls[f.uniqueId] = new FormControl(f.value || '')   
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  onUpload(e,id) {
    console.log(e);
    let reader = new FileReader();
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file); 
      reader.onload = () => {
        var img = reader.result;
        this.form.get(id).setValue(img);
        var item = this.uploadedFiles.findIndex(e=>e.imgid === id);
        debugger;
        if(item===-1){
        let file = {imgid: id,
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
    this.originalImage = cc[0].imgValue
    this.currentId =id
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var index = this.uploadedFiles.findIndex(e=>e.imgid === this.currentId);
    this.uploadedFiles[index].imgValue = this.croppedImage;
  }

}
