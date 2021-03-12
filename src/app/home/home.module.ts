import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SelectableDirective } from '../shared/directives/selectable.directive';
import { MoveClampedToParentDirective } from '../shared/directives/move-clamped-to-parent.directive';


import { CanvasSelectComponent } from './main/canvas-select/canvas-select.component';
import { EditTextComponent } from './main/edit-text/edit-text.component';
import { ImageSelectComponent } from './main/image-select/image-select.component';
import { LogoSelectComponent } from './main/logo-select/logo-select.component';
import { SizesSelectComponent } from './main/sizes-select/sizes-select.component';
import { TextSelectComponent } from './main/text-select/text-select.component';
import { ControlPanelComponent } from './main/control-panel/control-panel.component';
import { OverlayLogoComponent } from './main/overlay-logo/overlay-logo.component';
import { OverlayTextsComponent } from './main/overlay-texts/overlay-texts.component';
import { EditableTextComponent } from './main/editable-text/editable-text.component';
import { MainComponent } from './main/main.component';
import { ImageFilterService } from '../shared/services/image-filter.service';

import { LeftSideBarComponent } from '../shared/left-side-bar/left-side-bar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { IndexOfPipe } from '../shared/pipes/index-of.pipe';
import { TemplateComponent } from './main/template/template.component';

import { FormFieldsModule } from '../home/main/form-fields/form-fields.module';

@NgModule({
  declarations: [DashboardComponent, MainComponent, CanvasSelectComponent,
    EditTextComponent, ImageSelectComponent,  SelectableDirective,
    MoveClampedToParentDirective, LogoSelectComponent, SizesSelectComponent,
    TextSelectComponent,  ControlPanelComponent, OverlayLogoComponent, OverlayTextsComponent,
    EditableTextComponent, LeftSideBarComponent,
    HeaderComponent,
    MyProfileComponent,IndexOfPipe, TemplateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgbModule,
    ColorPickerModule,
    ImageCropperModule,
    ReactiveFormsModule,
    FormFieldsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA 
  ],
  providers: [ImageFilterService]
})
export class HomeModule { }
