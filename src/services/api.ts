import axios from "axios";

// Use Vercel API route as proxy to avoid CORS issues
const API_BASE_URL = "/api/proxy";

const API_KEY = "E6kUTYrYwZq2tN4QEtyzsbEBk3ie";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface ApiParams {
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface SalesItem {
  g_number: string;
  date: string;
  last_change_date: string;
  supplier_article: string;
  tech_size: string;
  barcode: number;
  total_price: string;
  discount_percent: string;
  is_supply: boolean;
  is_realization: boolean;
  promo_code_discount: string | null;
  warehouse_name: string;
  country_name: string;
  oblast_okrug_name: string;
  region_name: string;
  income_id: number;
  sale_id: string;
  odid: string | null;
  spp: string;
  for_pay: string;
  finished_price: string;
  price_with_disc: string;
  nm_id: number;
  subject: string;
  category: string;
  brand: string;
  is_storno: string | null;
}

export interface OrderItem {
  g_number: string;
  date: string;
  last_change_date: string;
  supplier_article: string;
  tech_size: string;
  barcode: number;
  total_price: string;
  discount_percent: number;
  warehouse_name: string;
  oblast: string;
  income_id: number;
  odid: string;
  nm_id: number;
  subject: string;
  category: string;
  brand: string;
  is_cancel: boolean;
  cancel_dt: string | null;
}

export interface StockItem {
  date: string;
  last_change_date: string;
  supplier_article: string;
  tech_size: string;
  barcode: number;
  quantity: number;
  is_supply: boolean;
  is_realization: boolean;
  quantity_full: number;
  warehouse_name: string;
  in_way_to_client: number;
  in_way_from_client: number;
  nm_id: number;
  subject: string;
  category: string;
  brand: string;
  sc_code: number;
  price: string;
  discount: string;
}

export interface IncomeItem {
  income_id: number;
  number: string;
  date: string;
  last_change_date: string;
  supplier_article: string;
  tech_size: string;
  barcode: number;
  quantity: number;
  total_price: string;
  date_close: string;
  warehouse_name: string;
  nm_id: number;
}

const buildQueryString = (params: ApiParams): string => {
  const queryParams = new URLSearchParams();

  if (params.dateFrom) queryParams.append("dateFrom", params.dateFrom);
  if (params.dateTo) queryParams.append("dateTo", params.dateTo);
  if (params.page) queryParams.append("page", params.page.toString());
  if (params.limit) queryParams.append("limit", params.limit.toString());

  queryParams.append("key", API_KEY);

  return queryParams.toString();
};

export const apiService = {
  async getSales(params: ApiParams = {}): Promise<ApiResponse<SalesItem>> {
    const queryString = buildQueryString(params);
    const response = await api.get(`?path=sales&${queryString}`);
    return response.data;
  },

  async getOrders(params: ApiParams = {}): Promise<ApiResponse<OrderItem>> {
    const queryString = buildQueryString(params);
    const response = await api.get(`?path=orders&${queryString}`);
    return response.data;
  },

  async getStocks(params: ApiParams = {}): Promise<ApiResponse<StockItem>> {
    const queryString = buildQueryString(params);
    const response = await api.get(`?path=stocks&${queryString}`);
    return response.data;
  },

  async getIncomes(params: ApiParams = {}): Promise<ApiResponse<IncomeItem>> {
    const queryString = buildQueryString(params);
    const response = await api.get(`?path=incomes&${queryString}`);
    return response.data;
  },
};
