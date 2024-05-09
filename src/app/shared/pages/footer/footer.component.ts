import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  public customDate: Date = new Date();

}
