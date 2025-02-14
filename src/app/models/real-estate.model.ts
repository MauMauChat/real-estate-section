export interface RealEstate {
  real_estate_id: number;
  user_id: number;
  category_name: string;
  type_name: string;
  property_name: string;
  description: string;
  property_address: string;
  city_name: string;
  province_name: string;
  rental_price: number;
  rental_period: string;
  advance_payment: number;
  immediate_availability: boolean;
  status: string;
  incoming_picture_urls: string[];
  type_attributes: any;
}
