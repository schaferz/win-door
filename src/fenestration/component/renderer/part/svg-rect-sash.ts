import {ChangeDetectionStrategy, Component, input} from '@angular/core';

/**
 * Négyzet alapú szárny nyílászárókhoz. Jelöli a nyílásirányokat.
 */
@Component({
  selector: 'g[app-svg-rect-sash]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:rect [attr.x]="x()" [attr.y]="y()" [attr.width]="width()" [attr.height]="height()"
              fill="none" stroke="black" stroke-width="1"/>

    <svg:g stroke="black" fill="none" stroke-width="1" opacity="0.8">
      @if (opening()) {
        @if (direction() === 'left') {
          <svg:path [attr.d]="'M ' + x() + ' ' + (y() + height()/2) + ' L ' + (x() + width()) + ' ' + y() +
                             ' M ' + x() + ' ' + (y() + height()/2) + ' L ' + (x() + width()) + ' ' + (y() + height())"/>
        } @else {
          <svg:path [attr.d]="'M ' + (x() + width()) + ' ' + (y() + height()/2) + ' L ' + x() + ' ' + y() +
                             ' M ' + (x() + width()) + ' ' + (y() + height()/2) + ' L ' + x() + ' ' + (y() + height())"/>
        }
      }

      @if (tilt()) {
        <svg:path [attr.d]="'M ' + x() + ' ' + (y() + height()) + ' L ' + (x() + width()/2) + ' ' + y() +
                           ' L ' + (x() + width()) + ' ' + (y() + height())"/>
      }
    </svg:g>
  `
})
export class SvgRectSashComponent {
  /** Origó X. */
  x = input.required<number>();

  /** Origó Y. */
  y = input.required<number>();

  /** Szélesség. */
  width = input.required<number>();

  /** Magasság. */
  height = input.required<number>();

  /** Nyitásirány: 'left' (balos) vagy 'right' (jobbos) */
  direction = input<'left' | 'right'>('right');

  /** Nyiló-e? */
  opening = input<boolean>(false);

  /** Bukó-e? */
  tilt = input<boolean>(false);
}
