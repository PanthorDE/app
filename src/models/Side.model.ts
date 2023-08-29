import type {Sides} from '../types';

export class Side {
  side: Sides;

  constructor(side: Sides) {
    this.side = side;
  }

  getLabel(): string {
    switch (this.side.toUpperCase()) {
      case 'MEDIC':
      case 'GUER':
        return 'Mediziner';
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
}
