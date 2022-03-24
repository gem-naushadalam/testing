import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: '[expandMenu]',
})
export class ExpandMenu {

  constructor(private _el: ElementRef) { }

  @HostBinding('class.active') isOpen = false;

  // constructor(private elRef: ElementRef, private rendered: Renderer2)

  @HostListener('click') toggleOpen() {

    this.isOpen = !this.isOpen;
    // this._el.nativeElement.querySelector('.dropdown-menu').classList.toggle('active')
  }

}
