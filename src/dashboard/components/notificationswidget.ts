import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule],
    template: `<div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Értesítések</div>
            <div>
                <button pButton type="button" icon="pi pi-ellipsis-v" class="p-button-rounded p-button-text p-button-plain" (click)="menu.toggle($event)"></button>
                <p-menu #menu [popup]="true" [model]="items"></p-menu>
            </div>
        </div>

        <span class="block text-muted-color font-medium mb-4">MA</span>
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-dollar text-xl! text-blue-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">
                    Jakab Elemér
                    <span class="text-surface-700 dark:text-surface-100">előleg befizetés <span class="text-primary font-bold">2 000 000 Ft</span></span>
                </span>
            </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">TEGNAP</span>
        <ul class="p-0 m-0 list-none mb-6">
          <li class="flex items-center py-2 border-b border-surface">
            <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
              <i class="pi pi-dollar text-xl! text-blue-500"></i>
            </div>
            <span class="text-surface-900 dark:text-surface-0 leading-normal">
                    Váradi Nándor
                    <span class="text-surface-700 dark:text-surface-100">befizetés <span class="text-primary font-bold">1 200 000 Ft</span></span>
                </span>
          </li>
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-question text-xl! text-pink-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">
                    Kerek Péter:
                    <span class="text-surface-700 dark:text-surface-100">ügyfél megkeresés szükséges.</span>
                </span>
            </li>
        </ul>
        <span class="block text-muted-color font-medium mb-4">MÚLT HÉTEN</span>
        <ul class="p-0 m-0 list-none">
            <li class="flex items-center py-2 border-b border-surface">
                <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                    <i class="pi pi-arrow-up text-xl! text-green-500"></i>
                </div>
                <span class="text-surface-900 dark:text-surface-0 leading-normal">Bevétel növekedés <span class="text-primary font-bold">%25</span>.</span>
            </li>
        </ul>
    </div>`
})
export class NotificationsWidget {
    items = [
      { label: 'Új értesítés', icon: 'pi pi-fw pi-plus' },
      { label: 'Törlés', icon: 'pi pi-fw pi-trash' }
    ];
}
