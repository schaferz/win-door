import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {StyleClassModule} from 'primeng/styleclass';
import {LayoutService} from '../../service/layout.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, StyleClassModule],
    template: `
      <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
          <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
            <i class="pi pi-bars"></i>
          </button>
          <a class="layout-topbar-logo" routerLink="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="5" y="3" width="14" height="18" rx="1" color="var(--primary-color)"/>
              <line x1="12" y1="3" x2="12" y2="21" color="var(--primary-color)"/>
              <line x1="16" y1="11" x2="18" y2="11" color="var(--primary-color)"/>
            </svg>
            <span>WinDoor</span>
          </a>
        </div>

        <div class="layout-topbar-actions">
          <div class="layout-topbar-menu hidden lg:block">
            <div class="layout-topbar-menu-content">
              <button type="button" class="layout-topbar-action">
                <i class="pi pi-calendar"></i>
                <span>Calendar</span>
              </button>
              <button type="button" class="layout-topbar-action">
                <i class="pi pi-inbox"></i>
                <span>Messages</span>
              </button>
              <button type="button" class="layout-topbar-action">
                <i class="pi pi-user"></i>
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>`
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}
}
