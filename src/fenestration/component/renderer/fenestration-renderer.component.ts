import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {Fenestration, FenestrationType} from '../../model';
import {SingleSashWindowRendererComponent} from './type/single-sash-window-renderer.component';
import {DoubleSashWindowRendererComponent} from './type/double-sash-window-renderer.component';

/**
 * Ajtót vagy ablakot a kapott modell alapján megjelenítő főkomponens.
 * A FenestrationType alapján a megfelelő típus-specifikus renderer komponensre delegál.
 */
@Component({
  selector: 'app-fenestration-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SingleSashWindowRendererComponent,
    DoubleSashWindowRendererComponent
  ],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="displayWidth()"
      [attr.height]="displayHeight()"
      [attr.viewBox]="viewBox()">

      @switch (model().type) {
        @case (FenestrationType.SingleSashWindow) {
          <g app-single-sash-window-renderer
            [width]="model().width"
            [height]="model().height"
            [frameThickness]="model().frameThickness || 0"
            [sashThickness]="model().sashThickness || 0"
            [sashConfig]="model().sashConfig!"
            [padding]="padding()">
          </g>
        }
        @case (FenestrationType.DoubleSashWindow) {
          <g app-double-sash-window-renderer
            [width]="model().width"
            [height]="model().height"
            [frameThickness]="model().frameThickness || 0"
            [sashThickness]="model().sashThickness || 0"
            [leftSashConfig]="model().leftSashConfig!"
            [rightSashConfig]="model().rightSashConfig!"
            [padding]="padding()">
          </g>
        }
      }
    </svg>
  `
})
export class FenestrationRendererComponent {
  /** A megjelenítendő ablak vagy ajtó leírója. */
  model = input.required<Fenestration>();

  /**
   * A kívánt fix szélesség pixelben, amennyit a képernyőn el kell foglalnia.
   * Ha ezt megadod, a scale automatikusan számolódik.
   */
  containerWidth = input<number>(600);

  /** Padding minden oldalról (mm). */
  padding = input<number>(200);

  /** FenestrationType enum referencia template-ben való használathoz. */
  protected readonly FenestrationType = FenestrationType;

  /** Megjelenítési méretekkel kapcsolatos számítások. */
  private displayCalculations = computed(() => {
    const totalWidthMM = this.model().width + (2 * this.padding());
    const totalHeightMM = this.model().height + (2 * this.padding());
    const autoScale = totalWidthMM / this.containerWidth();

    return {
      width: this.containerWidth(),
      height: totalHeightMM / autoScale,
      viewBox: `0 0 ${totalWidthMM} ${totalHeightMM}`
    };
  });

  /** Megjelenítési szélesség (px). */
  displayWidth = computed(() => this.displayCalculations().width);

  /** Megjelenítési magasság (px). */
  displayHeight = computed(() => this.displayCalculations().height);

  /** SVG viewBox string. */
  viewBox = computed(() => this.displayCalculations().viewBox);
}

