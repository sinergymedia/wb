import { ShellModel } from '../../core/shell/data-store';

export class LocationDealModel extends ShellModel {
  id: string;
  title: string;
  // description: string;
  // monthlyUses: number;
  // maxVal: number;
  // icon: string;
  
  constructor() {
    super();
  }
}

export class LocationModel extends ShellModel {
  id: string;
  name: string;
  formatted_phone_number: string;
  formatted_address: string;
  website: string;
  email: string;
  lat: number;
  lng: number;
  distance?: number;
  activeDeals: Array<any> = [
    '',
    '',
    ''
  ];
  constructor() {
    super();
  }
}
export class CombinedLocationModel extends LocationModel {
  activeDeals: Array<LocationDealModel> = [
    new LocationDealModel(),
    new LocationDealModel(),
    new LocationDealModel()
  ];

  constructor() {
    super();
  }
}
export class CoordinatesModel {
  lat: number;
  lng: number;
}