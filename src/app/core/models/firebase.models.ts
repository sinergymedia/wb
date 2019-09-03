import { ShellModel } from '../shell/data-store';


/*
 Deal Models
*/
export class ActiveDealModel extends ShellModel {
    id: string;
    dealId: string;
    title: string;
    description: string;
    maxVal: number;
    location: string;
    redeemed?: boolean;
    constructor() {
        super();
    }
}

export class RedeemedDealModel extends ShellModel {
    id: string;
    redeemId: string;
    dealId: string;
    dealTitle: string;
    description: string;
    location: string;
    month: number;
    year: number;
    icon: string;
    locationName: string;
    date: any;
    constructor() {
        super();
    }
}

/*
 User Models
*/

export class UserModel extends ShellModel {
    id: string;
    avatar: string;
    displayName: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    text_notifications: boolean;
    email_notifications: boolean;
    measurement_units: string;
    color_scheme: string;
    admin: boolean;
    signupDate: string;
    status: string;
    birthday: number; // timestamp
    freedeemed?: boolean;
    rIds: any;
    redeemedDeals: Array<any> = [
        '',
        '',
        ''
    ];
    constructor() {
        super();
    }
}

export class CombinedUserModel extends UserModel {
    redeemedDeals: Array<RedeemedDealModel> = [
        new RedeemedDealModel(),
        new RedeemedDealModel(),
        new RedeemedDealModel(),
    ];
    constructor() {
        super();
    }
}


export class LocationModel extends ShellModel {
    id: string;
    place_id: string;
    formatted_address: string;
    address_components: Array<any>;
    website: string;
    updatedAt: string;
    name: string;
    price_level: any;
    rating?: any;
    formatted_phone_number: string;
    createdAt: Date;
    status?: string;
    marker?: string;
    opening_hours?: string[];
    coords?: Array<any>;
    photos?: Array<any>;
    coverPhoto?: string;
    point: any;
    position?: any;
    lat: number;
    lng: number;
    reviews?: any;
    redeemedeals?: any;
    redeemId?: any;
    title?: any;
    usersPictures?: string[];
    hours?: Array<{
        day: string,
        from: string,
        to: string
    }>;
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
    activeDeals: Array<ActiveDealModel> = [
        new ActiveDealModel,
        new ActiveDealModel,
        new ActiveDealModel
    ];
    constructor() {
        super();
    }
}

export class LocationListingModel extends ShellModel {
    id?: string;
    locationId: string;
    name: string;
    price_level: any;
    lat: number;
    lng: number;
    distance?: number;
    constructor() {
        super();
    }

}
/*
 C(-R)UD Models

*/
export class ActiveDealCUDModel extends ShellModel {
    id?: string;
    dealId: string;
    title: string;
    description: string;
    maxVal: number;
    monthlyUses: number;
    location: any;
    date: any;
    icon: string;
    constructor() {
        super();
    }
}
export class BaseDealCUDModel extends ShellModel {
    id?: string;
    dealId: string;
    title: string;
    description: string;
    icon: string;
    maxVal: number;
    monthlyUses: number;

    constructor() {
        super();
    }
}

export class LocationCUDModel extends ShellModel {
    id?: string;
    formatted_address: string;
    address_components: Array<any>;
    website: string;
    updatedAt: string;
    name: string;
    price_level: any;
    rating?: any;
    formatted_phone_number: string;
    createdAt: Date;
    status?: string;
    marker?: string;
    opening_hours?: string[];
    coords?: Array<any>;
    photos?: Array<any>;
    coverPhoto?: string;
    point: any;
    position?: any;
    lat: number;
    lng: number;
    reviews?: any;

    constructor() {
        super();
    }
}
export class UserCUDModel extends ShellModel {
    id?: string;
    avatar: string;
    displayName: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    text_notifications: boolean;
    email_notifications: boolean;
    measurement_units: string;
    color_scheme: string;
    admin: boolean;
    signupDate: string;
    status: string;
    birthday: number; // timestamp
    freedeemed?: boolean;
    constructor() {
        super();
    }

}
export class ImageModel extends ShellModel {
    link: string;

    constructor() {
        super();
    }
}

