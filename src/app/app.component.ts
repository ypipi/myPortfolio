import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'yk-app';
  constructor(
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'ja']);
    translate.setDefaultLang('en');
  }

}
