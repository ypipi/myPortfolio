import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { faGlobe } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faGlobe = faGlobe;
  selectedLang = 'en';
  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
  }
  
  switchLang() {
    this.selectedLang = this.selectedLang === "ja" ? "en" : "ja";
    this.translate.use(this.selectedLang);
  }

  toggleNavBar () {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
        element.click();
    }
}

}
