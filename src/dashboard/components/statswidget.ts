import { Component } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [],
    template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Megrendelések</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">75</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">3 új </span>
                <span class="text-muted-color">az utolsó látogatás óta</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Bevétel</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">4 200 000</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">%52+ </span>
                <span class="text-muted-color">elmúlt egy hétben</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Ügyfelek</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">114</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">10 </span>
                <span class="text-muted-color">újonnan regisztrált</span>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Üzenetek</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">30 olvasott</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl!"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">12 </span>
                <span class="text-muted-color">olvasatlan</span>
            </div>
        </div>`
})
export class StatsWidget {}
