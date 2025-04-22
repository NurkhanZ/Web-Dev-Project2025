export interface User {
    id: number;
    username: string;
}


//! I have parameters field for convinience
//! Add it later

// export interface Property {
//     id: number;
//     title: string;
//     type: string;
//     price: number;
//     area: number;
//     rooms_count: number;
//     city: string,
//     address: string,
//     description: string;
//     img: Images[];
//     parameters: Map<string, any>; 
// }

// export const PropertyPlaceholder: Property[] = [
//   {
//     id: 1,
//     title: 'Beautiful family home',
//     type: 'House', 
//     price: 1200000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Anytown',
//     address: '123 Main St', 
//     description: 'Spacious 4 bedroom, 3 bathroom family home in quiet suburb',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 2,
//     title: 'Cozy beach cottage',
//     type: 'House',
//     price: 500000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Beachtown', 
//     address: '456 Ocean Ave',
//     description: 'Charming 2 bedroom cottage just steps from the beach', 
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 3,
//     title: 'Luxury high-rise condo',
//     type: 'Condo',
//     price: 1500000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Big City',
//     address: '789 Skyline Blvd', 
//     description: 'Stunning 20th floor condo with amazing city views',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 4,
//     title: 'Cozy studio apartment', 
//     type: 'Apartment',
//     price: 1000,
//     area: 10,
//     rooms_count: 5,
//     city: 'College Town',
//     address: '123 College Ave',
//     description: 'Small fully furnished studio perfect for students or single tenants',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 5,
//     title: 'Spacious loft',
//     type: 'Loft',
//     price: 300000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Urbanville',
//     address: '456 Industrial Way',
//     description: 'Huge open concept loft with high ceilings and large windows',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 6,
//     title: 'Modern townhouse',
//     type: 'Townhouse',
//     price: 450000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Suburbia',
//     address: '789 Main St',
//     description: 'Sleek 3 bedroom townhouse with rooftop patio',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 7,
//     title: 'Luxury mansion',
//     type: 'House',
//     price: 5000000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Fancyville',
//     address: '123 Rich Ln',
//     description: 'Stunning 10 bedroom mansion on sprawling estate',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 8,
//     title: 'Lakefront cabin',
//     type: 'Cabin',
//     price: 250000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Mountain Town',
//     address: '456 Pine Rd',
//     description: 'Cozy 2 bedroom cabin on beautiful mountain lake',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}] ,
//     parameters: {'a': 5}
//   },
//   {
//     id: 9,
//     title: 'Downtown apartment',
//     type: 'Apartment',
//     price: 2000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Funkytown',
//     address: '789 Hip St',
//     description: 'Sleek 1 bedroom apartment in trendy downtown area',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 10,
//     title: 'Rustic farmhouse',
//     type: 'House',
//     price: 300000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Farmland',
//     address: '123 Country Rd',
//     description: 'Charming 4 bedroom farmhouse on sprawling acreage', 
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 11,
//     title: 'Modern condo',
//     type: 'Condo',
//     price: 500000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Urbanopolis',
//     address: '456 Skyline Dr', 
//     description: 'Sleek 2 bedroom condo in luxury highrise building',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 12,
//     title: 'Waterfront home',
//     type: 'House',
//     price: 2000000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Coastline',
//     address: '789 Ocean Blvd',
//     description: 'Spacious 5 bedroom home with private dock',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 13,
//     title: 'Quaint cottage',
//     type: 'Cottage',
//     price: 250000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Pleasantville',
//     address: '123 Flower Ln',
//     description: 'Adorable 1 bedroom cottage surrounded by gardens',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 14,
//     title: 'Modern loft',
//     type: 'Loft',
//     price: 500000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Hipsterville',
//     address: '456 Industrial St',
//     description: 'Stunning open concept loft in renovated warehouse',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   },
//   {
//     id: 15,
//     title: 'Luxury villa',
//     type: 'House',
//     price: 4000000,
//     area: 10,
//     rooms_count: 5,
//     city: 'Fancy Hills',
//     address: '123 Elite Way',
//     description: 'Breathtaking 6 bedroom villa with private pool',
//     img: [{url: 'https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg'}],
//     parameters: {'a': 5}
//   }
// ]


// export interface Listing {
//     id: number;
//     user: User;
//     property: Property;
//     type: string;
//     listing_date: string; 
// }

// export const ListingPlaceholder: Listing[] = [
//     {
//         id: 1,
//         user: {id: 1, username: 'user1'},
//         property: PropertyPlaceholder[0],
//         type: 'For Sale',
//         listing_date: '2021-01-01'
//     }
// ]


// export interface Favorites {
//     id: number;
//     user: User;
//     listing: Listing;
// }

// export interface Images {
//     url: string;
// }