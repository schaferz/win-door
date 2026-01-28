import {computed, Signal} from '@angular/core';

/**
 * Közös interfész minden fenestration renderer komponenshez.
 * Tartalmazza a közös input paramétereket és számított értékeket.
 */
export interface BaseFenestrationRenderer {
  /** Szélesség (mm). */
  width: Signal<number>;

  /** Magasság (mm). */
  height: Signal<number>;

  /** Tok vastagsága (mm). */
  frameThickness: Signal<number>;

  /** Szárny vastagsága (mm). */
  sashThickness: Signal<number>;

  /** Padding minden oldalról (mm). */
  padding: Signal<number>;
}

/**
 * Közös számítások minden fenestration renderer komponenshez.
 */
export class BaseFenestrationCalculations {
  /**
   * Belső tok koordinátái és méretei.
   */
  static innerFrame(
    padding: number,
    width: number,
    height: number,
    frameThickness: number
  ) {
    return {
      x: padding + frameThickness,
      y: padding + frameThickness,
      width: width - 2 * frameThickness,
      height: height - 2 * frameThickness
    };
  }

  /**
   * Méretvonal eltolása.
   */
  static dimensionShift(padding: number): number {
    return (padding / 2) + 30;
  }

  /**
   * Méret formázása címkéhez (mm -> méter konverzió).
   */
  static formatDimension(mm: number): string {
    return (mm / 1000).toFixed(2);
  }
}
