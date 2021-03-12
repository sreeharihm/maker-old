import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFields } from '../models/formfields';

@Component({
  selector: 'app-img-fields',
  templateUrl: './img-fields.component.html',
  styleUrls: ['./img-fields.component.scss']
})
export class ImgFieldsComponent  {

  constructor() { }
  @Input()  options: any;
  @Input() form:FormGroup;

  

}
