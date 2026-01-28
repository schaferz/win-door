import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

export type DimensionLineDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * Méretvonal rajzoló komponens, ami négy irányban tud méreteket jelölni.
 * - 'left': bal oldalon függőleges méretvonal
 * - 'right': jobb oldalon függőleges méretvonal
 * - 'top': felül vízszintes méretvonal
 * - 'bottom': alul vízszintes méretvonal
 */
@Component({
  selector: 'g[app-svg-dimension-line]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Fő vonal -->
    <svg:line
      [attr.x1]="coords().mainLine.x1"
      [attr.y1]="coords().mainLine.y1"
      [attr.x2]="coords().mainLine.x2"
      [attr.y2]="coords().mainLine.y2"
      fill="none"
      stroke="black"/>

    <!-- Első végpont jelölés -->
    <svg:line
      [attr.x1]="coords().startCap.x1"
      [attr.y1]="coords().startCap.y1"
      [attr.x2]="coords().startCap.x2"
      [attr.y2]="coords().startCap.y2"
      fill="none"
      stroke="black"/>
    <svg:line
      [attr.x1]="coords().startArrow.x1"
      [attr.y1]="coords().startArrow.y1"
      [attr.x2]="coords().startArrow.x2"
      [attr.y2]="coords().startArrow.y2"
      fill="none"
      stroke="black"
      stroke-width="2"/>

    <!-- Második végpont jelölés -->
    <svg:line
      [attr.x1]="coords().endCap.x1"
      [attr.y1]="coords().endCap.y1"
      [attr.x2]="coords().endCap.x2"
      [attr.y2]="coords().endCap.y2"
      fill="none"
      stroke="black"/>
    <svg:line
      [attr.x1]="coords().endArrow.x1"
      [attr.y1]="coords().endArrow.y1"
      [attr.x2]="coords().endArrow.x2"
      [attr.y2]="coords().endArrow.y2"
      fill="none"
      stroke="black"
      stroke-width="3"/>

    <!-- Méret szöveg -->
    <svg:text
      [attr.x]="coords().text.x"
      [attr.y]="coords().text.y"
      [attr.transform]="coords().text.transform"
      text-anchor="middle"
      dominant-baseline="middle"
      font-family="Arial"
      font-size="80">
      {{ label() }}
    </svg:text>
  `
})
export class SvgDimensionLineComponent {
  /** Origó X 1. */
  x1 = input.required<number>();

  /** Origó Y 1. */
  y1 = input.required<number>();

  /** Origó X 2. */
  x2 = input.required<number>();

  /** Origó Y 2. */
  y2 = input.required<number>();

  /** Méretvonal iránya: 'left', 'right', 'top', 'bottom' */
  direction = input<DimensionLineDirection>('left');

  /** Mennyire legyen nagy a jelölés? */
  size = input<number>(50);

  /** Szöveg eltolás a vonaltól. */
  textOffset = input<number>(40);

  /** Megjelenítendő méret címke. */
  label = input<string>('1.50');

  /**
   * Koordináták kiszámítása az irány alapján.
   */
  coords = computed(() => {
    const dir = this.direction();
    const x1 = this.x1();
    const y1 = this.y1();
    const x2 = this.x2();
    const y2 = this.y2();
    const size = this.size();
    const textOffset = this.textOffset();

    switch (dir) {
      case 'left':
        return this.calculateLeftCoords(x1, y1, x2, y2, size, textOffset);
      case 'right':
        return this.calculateRightCoords(x1, y1, x2, y2, size, textOffset);
      case 'top':
        return this.calculateTopCoords(x1, y1, x2, y2, size, textOffset);
      case 'bottom':
        return this.calculateBottomCoords(x1, y1, x2, y2, size, textOffset);
    }
  });

  /**
   * Bal oldali méretvonal koordinátái (függőleges).
   */
  private calculateLeftCoords(x1: number, y1: number, x2: number, y2: number, size: number, textOffset: number) {
    const textX = x1 - textOffset;
    const textY = (y1 + y2) / 2;

    return {
      mainLine: { x1, y1: y1 - size, x2, y2: y2 + size },
      startCap: { x1: x1 - size, y1, x2: x1, y2: y1 },
      startArrow: { x1: x1 - size, y1: y1 - size, x2: x1 + size, y2: y1 + size },
      endCap: { x1: x1 - size, y1: y2, x2: x1, y2 },
      endArrow: { x1: x1 - size, y1: y2 - size, x2: x1 + size, y2: y2 + size },
      text: {
        x: textX,
        y: textY,
        transform: `rotate(-90, ${textX}, ${textY})`
      }
    };
  }

  /**
   * Jobb oldali méretvonal koordinátái (függőleges).
   */
  private calculateRightCoords(x1: number, y1: number, x2: number, y2: number, size: number, textOffset: number) {
    const textX = x2 + textOffset;
    const textY = (y1 + y2) / 2;

    return {
      mainLine: { x1: x2, y1: y1 - size, x2, y2: y2 + size },
      startCap: { x1: x2, y1, x2: x2 + size, y2: y1 },
      startArrow: { x1: x2 - size, y1: y1 - size, x2: x2 + size, y2: y1 + size },
      endCap: { x1: x2, y1: y2, x2: x2 + size, y2 },
      endArrow: { x1: x2 - size, y1: y2 - size, x2: x2 + size, y2: y2 + size },
      text: {
        x: textX,
        y: textY,
        transform: `rotate(90, ${textX}, ${textY})`
      }
    };
  }

  /**
   * Felső méretvonal koordinátái (vízszintes).
   */
  private calculateTopCoords(x1: number, y1: number, x2: number, y2: number, size: number, textOffset: number) {
    const textX = (x1 + x2) / 2;
    const textY = y1 - textOffset;

    return {
      mainLine: { x1: x1 - size, y1, x2: x2 + size, y2: y1 },
      startCap: { x1, y1: y1 - size, x2: x1, y2: y1 },
      startArrow: { x1: x1 - size, y1: y1 - size, x2: x1 + size, y2: y1 + size },
      endCap: { x1: x2, y1: y1 - size, x2, y2: y1 },
      endArrow: { x1: x2 - size, y1: y1 - size, x2: x2 + size, y2: y1 + size },
      text: {
        x: textX,
        y: textY,
        transform: ''
      }
    };
  }

  /**
   * Alsó méretvonal koordinátái (vízszintes).
   */
  private calculateBottomCoords(x1: number, y1: number, x2: number, y2: number, size: number, textOffset: number) {
    const textX = (x1 + x2) / 2;
    const textY = y2 + textOffset;

    return {
      mainLine: { x1: x1 - size, y1: y2, x2: x2 + size, y2 },
      startCap: { x1, y1: y2, x2: x1, y2: y2 + size },
      startArrow: { x1: x1 - size, y1: y2 - size, x2: x1 + size, y2: y2 + size },
      endCap: { x1: x2, y1: y2, x2, y2: y2 + size },
      endArrow: { x1: x2 - size, y1: y2 - size, x2: x2 + size, y2: y2 + size },
      text: {
        x: textX,
        y: textY,
        transform: ''
      }
    };
  }
}
