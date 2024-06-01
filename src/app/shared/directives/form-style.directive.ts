import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[formStyle]'
})
export class FormStyleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Añade tus estilos comunes aquí
    this.renderer.setStyle(this.el.nativeElement, 'background-color', '#F9FAFB');
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #D1D5DB');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#111827');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '0.875rem');
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '0.375rem');
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0.625rem');

    // Añade los estilos de enfoque
    this.el.nativeElement.addEventListener('focus', () => {
      this.renderer.setStyle(this.el.nativeElement, 'outline', '0');
      this.renderer.setStyle(this.el.nativeElement, 'ring', '0.3125rem #3B82F6');
      this.renderer.setStyle(this.el.nativeElement, 'border-color', '#3B82F6');
    });

    // Restablece los estilos cuando se pierde el enfoque
    this.el.nativeElement.addEventListener('blur', () => {
      this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'ring', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'border-color', '#D1D5DB');
    });
  }
}
