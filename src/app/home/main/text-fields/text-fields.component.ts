import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFields } from '../models/formfields';

@Component({
  selector: 'app-text-fields',
  templateUrl: './text-fields.component.html',
  styleUrls: ['./text-fields.component.scss']
})
export class TextFieldsComponent implements OnInit {

  @Input()  options: any;
  @Input() form:FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
