
export enum Page {
  DASHBOARD = 'dashboard',
  PRODUCTS = 'products',
  CUSTOMERS = 'customers',
  PROMOTIONS = 'promotions',
  SALES_CHANNELS = 'sales_channels',
  BUILDER = 'builder'
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  attributes: {
    color: string;
    sizes: string[];
    colorHex: string;
  };
  material: string;
  inventory: number;
  price: number;
  image: string;
  tags?: string[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'New' | 'Regular';
  spending: number;
  lastPurchase: string;
  avatar: string;
  email: string;
  birthday: string;
  gender: 'Nam' | 'Nữ';
  address: string;
  note: string;
}

export interface Promotion {
  id: string;
  code: string;
  name: string;
  usage: string;
  type: string;
  period: string;
  branch: string;
  status: 'Đang chạy' | 'Sắp diễn ra' | 'Đã kết thúc';
}
