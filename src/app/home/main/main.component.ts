import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EditSettingsService } from './../../shared/services/edit-settings.service';
import { GenerateImageService } from './../../shared/services/generate-image.service';
import { ImageFilterService } from './../../shared/services/image-filter.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NgbDropdownConfig]
})
export class MainComponent implements OnInit {
    public zoom = ['200%', '175%', '150%', '125%', '100%', '75%', '50%', '25%','15%', '10%']
    @Output() templateSettings: any;
    @Output() settings: any;

    public toggleSub = [false];
    public activeTabId = 'templates';
    public zoomValue = '50%';
constructor(private editSettingsService: EditSettingsService, 
              private generateImageService: GenerateImageService,
              private imageFilterService: ImageFilterService,
              public router: Router, config: NgbDropdownConfig) { 
                config.placement = 'top-right';
              }

  ngOnInit() { 
    this.settings = {        
        selectedImageUniqueId: "bk1",         
        selectedSizeIndex: 0,        
        selectedModelUniqueId: "-1",
        isWkFlow: false,
        canvasSettings: {
            downloadableImage: ''
        },
        sizeSettings: {
            sizes: [
                {
                    name: "Pinterest",
                    width: 1500,
                    height: 1500
                },
                {
                    name: "Instagram",
                    width: 500,
                    height: 500
                },
                {
                    name: "Twitter and Facebook",
                    width: 500,
                    height: 300
                }
            ]
        },
        logoSettings: { 
            images: []
        },
        textSettings: {
            hasHeader: false,
            hasBody: true,
            hasCaption: false,
            models: [
                { uniqueId: 'bk0txt', type: 'Add a heading', text: "Add a heading", fontIndex: 0, colorIndex: 0, alignIndex: 0, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size:110, width:780, height:110, tColor:"Black",bColor:"", fontSize: 24, divident: 7, top: 100, left: 100 },
                { uniqueId: 'bk1txt', type: 'Add a subheading', text: "Add a subheading", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 55 , width:730, height:110, tColor:"Black",bColor:"", fontSize: 16, divident: 14, top: 200, left: 100},
                { uniqueId: 'bk2txt', type: 'Add a little bit of body text', text: "Add a little bit of body text", fontIndex: 0, colorIndex: 0, alignIndex: 2, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 25, width:730, height:110, tColor:"Black",bColor:"", fontSize: 12, divident: 22, top:300, left: 100 }
            ],
            options: {
                align: ['align-left', 'align-center', 'align-right'],
                sizes: ['normal', 'large', 'largest'],
                fonts: [ 
                    { name: 'Arial', family: 'Arial' },
                    { name: 'Times', family: '"Times New Roman", Times, serif' }
                ],
                colors: ['Black', '#9C27B0', '#2196F3', '#009688', '#CDDC39', '#FF9800']
            }
        },
        imageSettings: {
            images: [
                {
                    url: "../assets/img/birthdayTemplate.png",
                    name: "Birdthday Template",
                    author: "Nishad",
                    location: "India",
                    tags: "rose, gift, petal, flower, scent, drawer, white, property",
                    uniqueId: "bk0", 
                },
                {
                    url: "../assets/img/birthdayTwo.jpg",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, property",
                    uniqueId: "bk1", 
                }, {
                    url: "../assets/img/justlisted.jpg",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, marketing",
                    uniqueId: "bk2",
                }, {
                    url: "../assets/img/justsold.jpg",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, property",
                    uniqueId: "bk3"
                }, {
                    url: "../assets/img/welcome.png",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, marketing",
                    uniqueId: "bk4"
                }, {
                    url: "../assets/img/welcomenew.jpg",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, property",
                    uniqueId: "bk5"
                } , {
                    url: "../assets/img/bday.jpg",
                    name: "Flowers on Stand",
                    author: "Julia Janeta",
                    location: "Unknown",
                    tags: "rose, gift, petal, flower, scent, drawer, white, property",
                    uniqueId: "bk6"
                }         
            ],
                filterQuery: ''
        }
    };
    this.templateSettings = [{
        bkId:"bk1",
        txtIds: ["bk1txt0","bk1txt1"],
        imgIds: ["bk1img0"],

        txtModels:[
            { uniqueId: "bk1txt0", type: 'name', text: "Name",label: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false, isSelected: true, size: 167 , width:2067, height:142, tColor:"Black",bColor:"", fontSize: 16, divident: 16.5, left: 2132, top: 3839 },
            { uniqueId: "bk1txt1", type: 'footercopy', text: 'Footer Copy',label: "Footer Copy", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false, isSelected: true, size: 104 , width:1748, height:83, tColor:"Black",bColor:"", fontSize: 16, divident: 22, left: 2303, top: 4063 }
        ],
        imgModels:[{
            text:"Photo",
            type: "photo",
            height: 1500 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk1img0",
            url: null,
            width:  1299,
            top: 2256,
            left: 2516
          }]
    },
    {
        bkId:"bk4",
        txtIds: ["bk4txt0","bk4txt1"],
        imgIds: ["bk4img0"],
        txtModels:[
            { uniqueId: "bk4txt0", type: 'name', text: "Name", label: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:172, width:2811, height:142, tColor:"#ffffff",bColor:"", fontSize: 24, divident: 16.5, left: 844, top: 3803 },
            { uniqueId: "bk4txt1", type: 'footercopy', text: "Footer Copy",label: "Footer Copy", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 92 , width:2811, height:83, tColor:"#ffffff",bColor:"", fontSize: 16, divident: 22, left: 844, top: 4016},
        ],
        imgModels:[{
            text:"Photo",
            type: "photo",
            height: 2008 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk4img0",
            url: null,
            width:  1748,
            top: 1665,
            left: 1376
          }]
    },
    {
        bkId:"bk5",
        txtIds: ["bk5txt0","bk5txt1"],
        imgIds: ["bk5img0"],
        txtModels:[
            { uniqueId: "bk5txt0", type: 'name', text: "Name",label: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:172, width:2811, height:142, tColor:"#ffffff",bColor:"", fontSize: 24, divident: 16.5, left: 844, top: 3803 },
            { uniqueId: "bk5txt1", type: 'footercopy', text: "Footer Copy",label: "Footer Copy", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 92 , width:2811, height:83, tColor:"#ffffff",bColor:"", fontSize: 16, divident: 22, left: 844, top: 4016},
        ],
        imgModels:[{
            text:"Photo",
            type: "photo",
            height: 2008 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk5img0",
            url: null,
            width:  1748,
            top: 1665,
            left: 1376
          }]
    },
    {
        bkId:"bk2",
        txtIds: ["bk2txt0","bk2txt1"],
        imgIds: ["bk2img0"],
        txtModels:[
            { uniqueId: "bk2txt0", type: 'name', text: "Name",label: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:492, height:31, tColor:"white",bColor:"", fontSize: 24, divident: 16, left: 51, top: 1346 },
            { uniqueId: "bk2txt1", type: 'footercopy', text: "Footer Copy",label: "Footer Copy", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 31 , width:492, height:28, tColor:"white",bColor:"", fontSize: 16, divident: 20, left: 51, top: 1409},
            { uniqueId: "bk2txt2", type: 'address', text: "Address",label: "Address", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:43, width:756, height:39, tColor:"#ffffff",bColor:"", fontSize: 24, divident: 16, left: 669, top: 984 },
            { uniqueId: "bk2txt3", type: 'phonenumber', text: "Phone Number",label: "Phone Number", fontIndex: 0, colorIndex: 0, alignIndex: 0, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size: 51 , width:399, height:39, tColor:"white",bColor:"", fontSize: 10, divident: 20, left: 854, top: 1398},

            { uniqueId: "bk2txt4", type: 'detail1', text: "detail1",label: "Detail1", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:283, height:39, tColor:"white",bColor:"", fontSize: 24, divident: 16, left: 669, top: 1098 },
            { uniqueId: "bk2txt5", type: 'detail2', text: "detail2",label: "Detail2", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:283, height:39, tColor:"white",bColor:"", fontSize: 16, divident: 20, left: 669, top: 1157},
            { uniqueId: "bk2txt6", type: 'detail3', text: "detail3",label: "Detail3", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:283, height:39, tColor:"#ffffff",bColor:"", fontSize: 24, divident: 16, left: 669, top: 1217 },
            { uniqueId: "bk2txt7", type: 'detail4', text: "detail4",label: "Detail4", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:433, height:39, tColor:"white",bColor:"", fontSize: 10, divident: 20, left: 992, top: 1098}, 
            { uniqueId: "bk2txt8", type: 'detail5', text: "detail5",label: "Detail5", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:433, height:39, tColor:"#ffffff",bColor:"", fontSize: 24, divident: 16, left: 992, top: 1157 },
            { uniqueId: "bk2txt9", type: 'detail6', text: "detail6",label: "Detail6", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:37, width:433, height:39, tColor:"white",bColor:"", fontSize: 10, divident: 20, left: 992, top: 1217},
        ],
        imgModels:[{
            text:"Photo",
            type: "photo",
            height: 366 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk2img0",
            url: null,
            width:  354,
            top: 948,
            left: 118
          },
          {
            text:"Picture1",
            type: "picture1",
            height: 551 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk2img1",
            url: null,
            width:  1130,
            top: 394,
            left: 0
          },
          {
            text:"Picture2",
            type: "picture2",
            height: 268 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk2img2",
            url: null,
            width:  354,
            top: 394,
            left: 1146
          },
          {
            text:"Picture3",
            type: "picture3",
            height: 268 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk2img3",
            url: null,
            width:  354,
            top: 677,
            left: 1146
          }
        ]
    },
    {
        bkId:"bk6",
        txtIds: ["bk6txt0","bk6txt1"],
        imgIds: ["bk6img0"],
        txtModels:[
            { uniqueId: "bk6txt0", type: 'name', text: "Name",label: "Name", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: true, isItalic: false,isSelected: false, size:172, width:2811, height:142, tColor:"#000000",bColor:"", fontSize: 24, divident: 16.5, left: 844, top: 3236 },
            { uniqueId: "bk6txt1", type: 'footercopy', text: "Footer Copy",label: "Footer Copy", fontIndex: 0, colorIndex: 0, alignIndex: 1, sizeIndex: 0, isBold: false, isItalic: false,isSelected: false, size: 92 , width:2811, height:83, tColor:"#000000",bColor:"", fontSize: 16, divident: 22, left: 844, top: 3425},
        ],
        imgModels:[{
            text:"Photo",
            type: "photo",
            height: 1535 ,
            isGraphicHidden: false,
            isSelected: true,
            radius: 0,
            selectedFile: null,
            size: 50,
            uniqueId: "bk6img0",
            url: null,
            width:  1264,
            top: 1606,
            left: 1618
        }]
    }]; 
  }

  onImageSettingsChange(payload: any) {
      this.editSettingsService.updateCanvas();
  }

  onCanvasReposition() {
      // console.log("canvas reposition");
  }

  onSizeSettingsChange(payload: any) {
      this.editSettingsService.updateCanvas();
      this.editSettingsService.updateOverlays();
  }

  onFilterReset() {
      //this.filterSettings.selectedFilterIndex = 0;
      //this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onFilterSettingsChange(payload: any) {
      //this.imageFilterService.updateFilter(this.filterSettings.filters[this.filterSettings.selectedFilterIndex]);
  }

  onTextSettingsChange(payload: any) {
      this.editSettingsService.updateOverlays();
  }

  onLogoSettingsChange(payload: any) {
      this.editSettingsService.updateOverlays();
  }

  onDownload() {
      this.generateImageService.generateImage();
  }
    onImageLayerSettingsChange(payload: any) {
        this.editSettingsService.updateOverlays();
    }
    zoomImage(zoomPercentage) {
        this.zoomValue = zoomPercentage;
    }
}
