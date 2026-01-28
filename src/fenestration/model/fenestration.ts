/** Nyílászáró típusa. */
export enum FenestrationType {
  /** Egyszárnyú ablak. */
  SingleSashWindow = 'SingleSashWindow',
  /** Kétszárnyú ablak. */
  DoubleSashWindow = 'DoubleSashWindow',
}

/** Szárny nyílásirány. */
export enum SashOpeningDirection {
  /** Fix (nem nyitható). */
  Fixed = 'Fixed',
  /** Balra nyíló. */
  Left = 'Left',
  /** Jobbra nyíló. */
  Right = 'Right',
}

/** Szárny konfiguráció. */
export interface SashConfig {
  /** Nyílásirány. */
  openingDirection: SashOpeningDirection;

  /** Bukó funkció engedélyezve. */
  tilt: boolean;
}

/** Nyílászáró modell. */
export interface Fenestration {
  /** Nyílászáró típusa. */
  type: FenestrationType;

  /** Szélesség (mm). */
  width: number;

  /** Magasság (mm). */
  height: number;

  /** Tok vastagsága (mm). */
  frameThickness?: number;

  /** Szárny vastagsága (mm). */
  sashThickness?: number;

  /** Szárny konfiguráció (egyszárnyú ablak esetén). */
  sashConfig?: SashConfig;

  /** Bal szárny konfiguráció (kétszárnyú ablak esetén). */
  leftSashConfig?: SashConfig;

  /** Jobb szárny konfiguráció (kétszárnyú ablak esetén). */
  rightSashConfig?: SashConfig;
}
