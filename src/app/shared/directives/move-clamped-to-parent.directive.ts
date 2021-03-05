import { Directive, ElementRef, Input } from '@angular/core';
declare var _: any;

@Directive({
  selector: '[appMoveClampedToParent]',
  host: {
		'(mousedown)': 'onMouseDown($event)',
		'(document: mousemove)': 'onMouseMove($event)',
		'(document: mouseup)': 'onMouseUp($event)',
		'(keydown.ArrowUp)': 'onNudge($event)',
		'(keydown.ArrowRight)': 'onNudge($event)',
		'(keydown.ArrowDown)': 'onNudge($event)',
		'(keydown.ArrowLeft)': 'onNudge($event)',
		'(keyup.ArrowUp)': 'onNudge($event)',
		'(keyup.ArrowRight)': 'onNudge($event)',
		'(keyup.ArrowDown)': 'onNudge($event)',
		'(keyup.ArrowLeft)': 'onNudge($event)'
	}
})
export class MoveClampedToParentDirective {

 //element refs
 private el: HTMLElement;
 private parent: HTMLElement;
 @Input('appMoveClampedToParent') isWkFlow: boolean;
 //movable flag
 private isMovable: boolean = false;
 
 //position model helper
 private pos: any = { x: 0, y: 0, clampX: 0, clampY: 0 };
 
 //arrow key store
 private keys: Array<number> = [37, 38, 39, 40];

 constructor(el: ElementRef) {

   //el ref
   this.el = el.nativeElement;
   //tab index allows div to accept key events
   this.el.tabIndex = 1;

   //default key values
   this.keys[37] = this.keys[38] = this.keys[39] = this.keys[40] = 0;
 }

 public update() {

   //update ref due to ngIf
   this.parent = this.el.parentElement;

   //update clamp settings

   this.pos.clampX = this.parent.offsetWidth - this.el.offsetWidth;
   this.pos.clampY = this.parent.offsetHeight - this.el.offsetHeight;

   //update position
   this.updatePosition();
 }

 private updatePosition(x: number = 0, y: number = 0) {
   this.pos.x;
   this.el.style.left;

   //update data
   this.pos.x += x;
   this.pos.y += y;

   //clamp data
   this.pos.x = this.clamp(this.pos.x, 0, this.pos.clampX);
   this.pos.y = this.clamp(this.pos.y, 0, this.pos.clampY);

   //update view
   if(!this.isWkFlow){
   this.el.style.left = this.pos.x + 'px';
   this.el.style.top = this.pos.y + 'px';
   } else {
    this.el.style.left = this.el.style.left ? this.el.style.left : this.pos.x + 'px';
    this.el.style.top = this.el.style.top ? this.el.style.top : this.pos.y + 'px';
   }
 }

 private onMouseDown($event) {

   //ensure fresh size calculation accounted for
   this.update();

   //update drag flag
   this.isMovable = true;
 }

 private onMouseMove($event) {
   
   //exit condition
   if (!this.isMovable ) { 
   // this.adjust($event.movementX, $event.movementY);
   return;
    }
    else{
      //update position
      this.updatePosition($event.movementX, $event.movementY);
    }
 }

 private onMouseUp($event) {
   //update drag flag
   this.isMovable = false; 
 }
 adjust(xX,yY){
  const x = xX;
  const y = yY;
  const width = this.el.offsetWidth;
  const height = this.el.offsetHeight;
  const top = parseInt(this.el.style.top.replace('px', ''))
  const left =parseInt(this.el.style.left.replace('px', ''))
  this.el.style.width = (x-left) + 'px';
  this.el.style.height = (y-top) + 'px';
}
 private onNudge($event) {
   
   //update keys
   this.keys[$event.keyCode] = $event.type === 'keydown' ? 1 : 0;

   //update move targets accommodating multiple keys
   let x = 0 - this.keys[37] + this.keys[39];
   let y = 0 - this.keys[38] + this.keys[40];

   //update position
   this.updatePosition(x, y);
 }

 clamp(number, lower, upper) {
  if (upper === undefined) {
    upper = lower;
    lower = undefined;
  }
  if (upper !== undefined) {
    upper = parseFloat(upper);
    upper = upper === upper ? upper : 0;
  }
  if (lower !== undefined) {
    lower = parseFloat(lower);
    lower = lower === lower ? lower : 0;
  }
  return this.baseClamp(parseFloat(number), lower, upper);
}

baseClamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}

}
