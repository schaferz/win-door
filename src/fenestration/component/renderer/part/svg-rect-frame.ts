import {ChangeDetectionStrategy, Component, input} from '@angular/core';

/**
 * Négyzet alapú keret, ami a tokot rajzolja a hagyományos nyílászárókhoz.
 */
@Component({
  selector: 'g[app-svg-rect-frame]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:rect [attr.x]="x()"
              [attr.y]="y()"
              [attr.width]="width()"
              [attr.height]="height()"
              fill="white"
              stroke="black"/>
    <svg:rect [attr.x]="x() + thickness()"
              [attr.y]="y() + thickness()"
              [attr.width]="width() - 2 * thickness()"
              [attr.height]="height() - 2 * thickness()"
              fill="none"
              stroke="black"/>
  `
})
export class SvgRectFrameComponent {
  /** Origó X. */
  x = input.required<number>();

  /** Origó Y. */
  y = input.required<number>();

  /** Szélesség. */
  width = input.required<number>();

  /** Magasság. */
  height = input.required<number>();

  /** Tokvastagság. */
  thickness = input.required<number>();
}
