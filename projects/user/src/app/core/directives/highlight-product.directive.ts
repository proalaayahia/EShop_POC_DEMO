import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightProduct]',
  standalone: true
})
export class HighlightProductDirective implements AfterViewInit {
element!:ElementRef
@Input('appHighlightProduct') externalColor:string='yellow'
  constructor(private ele:ElementRef) { 
    this.element=this.ele
  }
  ngAfterViewInit(): void {
    this.ele.nativeElement.style.backgroundColor=this.externalColor;
  }
@HostListener('mouseover') over(){
  this.element.nativeElement.style.backgroundColor=this.externalColor;
}
@HostListener('mouseout') out(){
  this.element.nativeElement.style.backgroundColor='grey';
}
}
