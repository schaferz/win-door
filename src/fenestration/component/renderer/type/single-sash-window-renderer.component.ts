import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {SvgRectFrameComponent} from '../part/svg-rect-frame';
import {SvgRectSashComponent} from '../part/svg-rect-sash';
import {SvgDimensionLineComponent} from '../part/svg-dimension-line';
import {BaseFenestrationCalculations} from './base-fenestration-renderer';
import {SashConfig, SashOpeningDirection} from '../../../model';

/**
 * Egyszárnyú ablak renderer komponens.
 */
@Component({
  selector: 'g[app-single-sash-window-renderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgRectFrameComponent, SvgRectSashComponent, SvgDimensionLineComponent],
  template: `
    @let sashCoords = sashCalc();
    @let dimShift = dimensionShift();
    @let config = sashConfig();
    @let isFixed = config.openingDirection === 'Fixed';

    <!-- Tok -->
    <svg:g app-svg-rect-frame
       [x]="padding()"
       [y]="padding()"
       [width]="width()"
       [height]="height()"
       [thickness]="frameThickness()">
    </svg:g>

    <!-- Szárny (csak ha nem fix) -->
    @if (!isFixed) {
      <svg:g app-svg-rect-sash
         [x]="sashCoords.x"
         [y]="sashCoords.y"
         [width]="sashCoords.width"
         [height]="sashCoords.height"
         [opening]="true"
         [tilt]="config.tilt"
         [direction]="config.openingDirection === 'Left' ? 'left' : 'right'">
      </svg:g>
    }

    <!-- Méretvonalak -->
    <svg:g app-svg-dimension-line
       direction="left"
       [x1]="width() + padding() + dimShift"
       [y1]="padding()"
       [x2]="width() + padding() + dimShift"
       [y2]="height() + padding()"
       [label]="formatDimension(height())">
    </svg:g>

    <svg:g app-svg-dimension-line
       direction="top"
       [x1]="padding()"
       [y1]="padding() + height() + dimShift"
       [x2]="padding() + width()"
       [y2]="padding() + height() + dimShift"
       [label]="formatDimension(width())">
    </svg:g>
  `
})
export class SingleSashWindowRendererComponent {
  /** Szélesség (mm). */
  width = input.required<number>();

  /** Magasság (mm). */
  height = input.required<number>();

  /** Tok vastagsága (mm). */
  frameThickness = input<number>(0);

  /** Szárny vastagsága (mm). */
  sashThickness = input<number>(0);

  /** Padding minden oldalról (mm). */
  padding = input.required<number>();

  /** Szárny konfiguráció. */
  sashConfig = input<SashConfig>({ openingDirection: SashOpeningDirection.Right, tilt: false });

  /** Belső tok koordinátái és méretei. */
  protected innerFrameCalc = computed(() =>
    BaseFenestrationCalculations.innerFrame(
      this.padding(),
      this.width(),
      this.height(),
      this.frameThickness()
    )
  );

  /** Szárny koordinátái és méretei. */
  protected sashCalc = computed(() => {
    const innerFrame = this.innerFrameCalc();
    const sashThickness = this.sashThickness();

    return {
      x: innerFrame.x + sashThickness,
      y: innerFrame.y + sashThickness,
      width: innerFrame.width - 2 * sashThickness,
      height: innerFrame.height - 2 * sashThickness
    };
  });

  /** Méretvonal eltolása. */
  protected dimensionShift = computed(() =>
    BaseFenestrationCalculations.dimensionShift(this.padding())
  );

  /** Méret formázása. */
  protected formatDimension = BaseFenestrationCalculations.formatDimension;
}
