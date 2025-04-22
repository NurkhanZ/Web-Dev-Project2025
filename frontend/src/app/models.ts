export interface User {
    id: number;
    username: string;
    contact_info: string;
}

export interface Property {
    id: number;
    title: string;
    type: string;
    price: number;
    area: number;
    rooms_count: number;
    city: string,
    address: string,
    description: string;
    images: Images[]; 
    parameters: Map<string, any>; 
}

export interface Listing {
    id: number;
    user: number;
    property: Property;
    type: string;
    listing_date: string; 
}

export interface Favorites {
    user_id: number;
    listing_id: number;
}

export interface Images {
    url: string;
}

export interface Token {
    access: string;
    refresh: string;
  }
