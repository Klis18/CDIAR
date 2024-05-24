import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { HomeService } from '../services/home.service';
import { Home } from '../interfaces/home';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  userName: string = '';
  rol: string = '';

  private _mobileQueryListener: () => void;
  private homeService = inject(HomeService);

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.homeService.obtenerDatosMenu().subscribe((user) => {
      this.userName = user.data.userName;
      this.rol = user.data.rol;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
