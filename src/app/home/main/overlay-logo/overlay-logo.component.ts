import { Component, Input, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { EditSettingsService } from '../../../shared/services/edit-settings.service';
import { MoveClampedToParentDirective } from '../../../shared/directives/move-clamped-to-parent.directive';
const enum Status {
	OFF = 0,
	RESIZE = 1,
	MOVE = 2
  }

@Component({
  selector: 'app-overlay-logo',
  templateUrl: './overlay-logo.component.html',
  styleUrls: ['./overlay-logo.component.css']
})
export class OverlayLogoComponent implements OnInit,AfterViewInit {

  @ViewChild(MoveClampedToParentDirective) logo: MoveClampedToParentDirective;

	@Input() settings: any;
	
	@Input('width') public width: number;
  	@Input('height') public height: number;
  	@Input('left') public left: number;
  	@Input('top') public top: number;
  	@ViewChild("imgLay") public box: ElementRef;
  	private boxPosition: { left: number, top: number };
  	private containerPos: { left: number, top: number, right: number, bottom: number };
  	public mouse: {x: number, y: number}
	public status: Status = Status.OFF;
	public uniqueId;
  	private mouseClick: {x: number, y: number, left: number, top: number}

	public isSelected: boolean = false;

	constructor(private editSettingsService: EditSettingsService, private el: ElementRef) { 
		this.el = el.nativeElement;
	}

	ngOnInit() {
		//subscribe
		this.editSettingsService.storeOverlays.subscribe((isClear) => this.onUpdateOverlays(isClear));
	}
	ngAfterViewInit(){
		this.loadBox();
		this.loadContainer();
	}

	onUpdateOverlays(isClear: boolean) {

		//update
		if(this.logo) {
			this.logo.update();
		}

		//clear currently selected controls
		if (isClear) {
			this.isSelected = false;
		}
	}

	onSelect() {

		//only one selected overlay at a time
		this.editSettingsService.updateOverlays(true);

		//update
		this.isSelected = true;
	}
	
	private loadBox(){
		const {left, top} = this.box.nativeElement.getBoundingClientRect();
		const e = this.box.nativeElement.getBoundingClientRect();
		const ls = Number(e.left)/2;
		const tf = Number(e.top)/2;
		this.boxPosition = {left,top}
		this.boxPosition.left =ls;
		this.boxPosition.top = tf;
		
	}
	
	private loadContainer(){
		const left =Number(this.boxPosition.left - this.left)/2;
		const top = Number(this.boxPosition.top - this.top)/2;
		const right = Number(left + this.width)/2;
		const bottom = Number(top + this.height)/2;
		this.containerPos = { left, top, right, bottom };
	}

	setStatus(event: MouseEvent, status: number,id: number){
    
		if(status === 1) event.stopPropagation();
		else if(status === 2) this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
		else this.loadBox();
		this.status = status;
		this.uniqueId = id;
	  }
	
	@HostListener('window:mousemove', ['$event'])
	onMouseMove(event: MouseEvent){
	this.mouse = { x: event.clientX, y: event.clientY };
	if(this.status === Status.RESIZE) this.resize();
	}

	private resize(){
		this.settings.logoSettings.images[this.uniqueId].width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
		this.settings.logoSettings.images[this.uniqueId].height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
	}

	private resizeCondMeet(){
	return (Number(this.mouse.x)/2 < this.containerPos.right && Number(this.mouse.y)/2 < this.containerPos.bottom);
	}

}
