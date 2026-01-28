import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {SvgRectFrameComponent} from '../part/svg-rect-frame';
import {SvgRectSashComponent} from '../part/svg-rect-sash';
import {SvgDimensionLineComponent} from '../part/svg-dimension-line';
import {BaseFenestrationCalculations} from './base-fenestration-renderer';
import {SashConfig, SashOpeningDirection} from '../../../model';

/**
 * Kétszárnyú ablak renderer komponens.
 */
@Component({
  selector: 'g[app-double-sash-window-renderer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SvgRectFrameComponent, SvgRectSashComponent, SvgDimensionLineComponent],
  template: `
    @let leftSashCoords = leftSashCalc();
    @let rightSashCoords = rightSashCalc();
    @let dimShift = dimensionShift();
    @let leftConfig = leftSashConfig();
    @let rightConfig = rightSashConfig();
    @let isLeftFixed = leftConfig.openingDirection === 'Fixed';
    @let isRightFixed = rightConfig.openingDirection === 'Fixed';

    <!-- Tok -->
    <svg:g app-svg-rect-frame
       [x]="padding()"
       [y]="padding()"
       [width]="width()"
       [height]="height()"
       [thickness]="frameThickness()">
    </svg:g>

    <!-- Bal szárny (csak ha nem fix) -->
    @if (!isLeftFixed) {
      <svg:g app-svg-rect-sash
         [x]="leftSashCoords.x"
         [y]="leftSashCoords.y"
         [width]="leftSashCoords.width"
         [height]="leftSashCoords.height"
         [opening]="true"
         [tilt]="leftConfig.tilt"
         [direction]="leftConfig.openingDirection === 'Left' ? 'left' : 'right'">
      </svg:g>
    }

    <!-- Jobb szárny (csak ha nem fix) -->
    @if (!isRightFixed) {
      <svg:g app-svg-rect-sash
         [x]="rightSashCoords.x"
         [y]="rightSashCoords.y"
         [width]="rightSashCoords.width"
         [height]="rightSashCoords.height"
         [opening]="true"
         [tilt]="rightConfig.tilt"
         [direction]="rightConfig.openingDirection === 'Left' ? 'left' : 'right'">
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
export class DoubleSashWindowRendererComponent {
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

  /** Bal szárny konfiguráció. */
  leftSashConfig = input<SashConfig>({ openingDirection: SashOpeningDirection.Left, tilt: false });

  /** Jobb szárny konfiguráció. */
  rightSashConfig = input<SashConfig>({ openingDirection: SashOpeningDirection.Right, tilt: false });

  /** Belső tok koordinátái és méretei. */
  protected innerFrameCalc = computed(() =>
    BaseFenestrationCalculations.innerFrame(
      this.padding(),
      this.width(),
      this.height(),
      this.frameThickness()
    )
  );

  /** Bal szárny koordinátái és méretei. */
  protected leftSashCalc = computed(() => {
    const innerFrame = this.innerFrameCalc();
    const sashThickness = this.sashThickness();
    const halfWidth = innerFrame.width / 2;

    return {
      x: innerFrame.x + sashThickness,
      y: innerFrame.y + sashThickness,
      width: halfWidth - sashThickness - sashThickness / 2,
      height: innerFrame.height - 2 * sashThickness
    };
  });

  /** Jobb szárny koordinátái és méretei. */
  protected rightSashCalc = computed(() => {
    const innerFrame = this.innerFrameCalc();
    const sashThickness = this.sashThickness();
    const halfWidth = innerFrame.width / 2;

    return {
      x: innerFrame.x + halfWidth + sashThickness / 2,
      y: innerFrame.y + sashThickness,
      width: halfWidth - sashThickness - sashThickness / 2,
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
