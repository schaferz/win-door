import {Component, OnInit} from '@angular/core';

import {RouterModule} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {AppMenuitem} from './app.menuitem';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [AppMenuitem, RouterModule],
  template: `
    <ul class="layout-menu">
      @for (item of model; track item; let i = $index) {
        @if (!item.separator) {
          <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
        }
        @if (item.separator) {
          <li class="menu-separator"></li>
        }
      }
    </ul>`
})
export class AppMenu implements OnInit {
  model: MenuItem[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'Ügyvitel',
        items: [{label: 'Főoldal', icon: 'pi pi-fw pi-home', routerLink: ['/']}]
      },
      {
        label: 'Törzsadat',
        items: [
          {label: 'Összetevők', icon: 'pi pi-fw pi-database', routerLink: ['/part']},
          {label: 'Nyílászárók', icon: 'pi pi-fw pi-microsoft', routerLink: ['/fenestration']},
        ]
      },
    ];
  }
}
