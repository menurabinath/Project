export interface Shop {
  name: string;
  price: number;
  currency: string;
  logo: string;
  visitUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  shops: Shop[];
  specifications: Record<string, string>;
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  hasMore: boolean;
}

export interface AdminStats {
  topSearches: Array<{ query: string; count: number }>;
  noResultsQueries: Array<{ query: string; count: number }>;
  topProducts: Array<Product & { clickCount: number }>;
}
</parameter>