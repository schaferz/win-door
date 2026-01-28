import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {FenestrationRendererComponent} from './renderer/fenestration-renderer.component';
import {Fenestration, FenestrationType, SashOpeningDirection} from '../model';
import {FenestrationConfigFormComponent} from './form/fenestration-config-form';


@Component({
  selector: 'app-fenestration',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FenestrationRendererComponent, FenestrationConfigFormComponent
  ],
  template: `
    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-3 card">
        <app-fenestration-config-form [(model)]="model"></app-fenestration-config-form>
      </div>
      <div class="col-span-9 card">
        <app-fenestration-renderer [model]="model()"></app-fenestration-renderer>
      </div>
    </div>
  `
})
export class FenestrationComponent {

  model = signal<Fenestration>({
    type: FenestrationType.SingleSashWindow,
    width: 1200,
    height: 1500,
    frameThickness: 75,
    sashThickness: 75,
    sashConfig: {
      openingDirection: SashOpeningDirection.Right,
      tilt: false
    }
  });
}
