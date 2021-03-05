import { Component, ElementRef, Input, Renderer2, ViewChild, AfterViewInit, HostListener, Output, EventEmitter } from '@angular/core';
import { EditTextComponent } from '../edit-text/edit-text.component';
const enum Status {
	OFF = 0,
	RESIZE = 1,
	MOVE = 2
  }

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})

export class EditableTextComponent implements  AfterViewInit  {

	@ViewChild('textInput', { read: ElementRef }) textInput;

	@Input() model: any;
	@Input() options: any;

	@Input('width') public width: number;
  	@Input('height') public height: number;
  	@Input('left') public left: number;
  	@Input('top') public top: number;
	@ViewChild("box") public box: ElementRef;
	@Output() onResized: EventEmitter<any> = new EventEmitter<any>();
  	private boxPosition: { left: number, top: number };
  	private containerPos: { left: number, top: number, right: number, bottom: number };
  	public mouse: {x: number, y: number}
  	public status: Status = Status.OFF;
  	private mouseClick: {x: number, y: number, left: number, top: number}

	isEditing: boolean;

	constructor(private renderer: Renderer2, private el: ElementRef) {
		this.el = el.nativeElement;
	}
	
	ngAfterViewInit(){
		this.loadBox();
		this.loadContainer();
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
	public reset() {

		//update edit flag
		this.isEditing = false;
	}

	public addEditTextControls(editTextComponent: EditTextComponent) {
    //this.renderer.invokeElementMethod(this.el, 'appendChild', [editTextComponent.el]);
    //this.renderer.appendChild(this.el,editTextComponent.el);
	}
	
	onDoubleClick($event: any) {

		//update edit flag
		this.isEditing = true;

		//update textInput
    //this.renderer.invokeElementMethod(this.textInput.nativeElement, 'focus', []);
    this.renderer.selectRootElement(this.textInput.nativeElement).focus();//['focus'].apply(this.textInput.nativeElement);
    //this.renderer.invokeElementMethod(this.textInput.nativeElement, 'select', []);
	//this.renderer['select'].apply(this.textInput.nativeElement);
	this.renderer.selectRootElement(this.textInput.nativeElement).select();
	}
	setStatus(event: MouseEvent, status: number){
		if(status === 1) event.stopPropagation();
		else if(status === 2) this.mouseClick = { x: event.clientX, y: event.clientY, left: this.left, top: this.top };
		else this.loadBox();
		this.status = status;
	  }
	
	@HostListener('window:mousemove', ['$event'])
	onMouseMove(event: MouseEvent){
	this.mouse = { x: event.clientX, y: event.clientY };
	if(this.status === Status.RESIZE) this.resize();
	}

	private resize(){
		this.width = Number(this.mouse.x > this.boxPosition.left) ? this.mouse.x - this.boxPosition.left : 0;
		this.height = Number(this.mouse.y > this.boxPosition.top) ? this.mouse.y - this.boxPosition.top : 0;
		this.onResized.emit({'width': this.width, 'height':this.height, 'uniqueId': this.model.uniqueId});
	}

	private resizeCondMeet(){
	return (Number(this.mouse.x)/2 < this.containerPos.right && Number(this.mouse.y)/2 < this.containerPos.bottom);
	}
}
