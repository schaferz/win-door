import {Component} from '@angular/core';

@Component({
  selector: 'app-part',
  imports: [],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 xl:col-span-6">
        PartComponent
      </div>
    </div>
  `
})
export class PartComponent {
}
