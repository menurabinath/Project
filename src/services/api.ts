const API_BASE = 'http://localhost:3001/api';

export interface SearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const api = {
  search: async (params: SearchParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== '') {
          acc[key] = value.toString();
        }
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    
    const response = await fetch(`${API_BASE}/search?${queryString}`);
    return response.json();
  },

  getSuggestions: async (query: string) => {
    const response = await fetch(`${API_BASE}/suggestions?query=${encodeURIComponent(query)}`);
    return response.json();
  },

  getProduct: async (id: string) => {
    const response = await fetch(`${API_BASE}/product/${id}`);
    return response.json();
  },

  getTrending: async () => {
    const response = await fetch(`${API_BASE}/trending`);
    return response.json();
  },

  getCategories: async () => {
    const response = await fetch(`${API_BASE}/categories`);
    return response.json();
  },

  getAdminStats: async () => {
    const response = await fetch(`${API_BASE}/admin/stats`);
    return response.json();
  }
};