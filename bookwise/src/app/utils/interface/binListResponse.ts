export interface BinListResponse {
  scheme: string;
  type: string;
  brand: string;
  country: {
    name: string;
    currency: string;
  };
}