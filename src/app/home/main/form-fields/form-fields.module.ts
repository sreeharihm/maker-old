import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldsComponent } from '../text-fields/text-fields.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormFieldsComponent} from './form-fields.component';
import { ImgFieldsComponent } from '../img-fields/img-fields.component';

@NgModule({
  declarations: [TextFieldsComponent,FormFieldsComponent,ImgFieldsComponent],
  exports: [
    FormFieldsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class FormFieldsModule { }
