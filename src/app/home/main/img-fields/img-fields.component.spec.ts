import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFieldsComponent } from './img-fields.component';

describe('ImgFieldsComponent', () => {
  let component: ImgFieldsComponent;
  let fixture: ComponentFixture<ImgFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
