import type {Sides} from '../types';

export class Side {
  side: Sides;

  constructor(side: Sides) {
    this.side = side;
  }

  /**
   * @deprecated
   * Use `getTranslationKey()` and retrieve the proper localized-value by using the `i18n` `t`-function
   */
  getLabel(): string {
    return this.getTranslationKey();
    switch (this.side.toUpperCase()) {
      case 'MEDIC':
      case 'GUER':
        return 'Rettungsdienst';
      case 'WEST':
        return 'Polizei';
      case 'ADAC':
      case 'EAST':
        return 'RAC';
      case 'CIV':
      default:
        return 'Zivilisten';
    }
  }

  getTranslationKey(): string {
    switch (this.side.toUpperCase()) {
      case 'MEDIC':
      case 'GUER':
        return 'sides.medic';
      case 'WEST':
        return 'sides.cop';
      case 'ADAC':
      case 'EAST':
        return 'sides.rac';
      case 'CIV':
      default:
        return 'sides.civilian';
    }
  }
}
