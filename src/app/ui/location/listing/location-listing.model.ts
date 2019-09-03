import { ShellModel } from '../../../core/shell/data-store';

export class LocationListingItemModel extends ShellModel {
  id: string;
  formatted_address: string;
  address_components: Array<any>;
  website: string;
  updatedAt: string;
  name: string;
  price_level: any;
  rating: any;
  formatted_phone_number: string;
  createdAt: Date;
  status?: string;
  marker?: string;
  opening_hours?: Array<any>;
  coords?: Array<any>;
  photos?: Array<any>;
  coverPhoto: string;
  point: any;
  lat: number;
  lng: number;
  reviews?: any;
  activeDeals: Array<any> = [
    '',
    '',
    ''
  ];

  constructor() {
    super();
  }
}
