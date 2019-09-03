import { ShellModel } from '../../core/shell/data-store';

export class LocationItemModel extends ShellModel {
  id: string;
  name: string;
  rating: string;
  price_level: string;
  distance?: number;

  constructor() {
    super();
  }
}
