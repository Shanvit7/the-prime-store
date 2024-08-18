// BASE SERVICE
import ApiService from "@/services";

class ProductsService extends ApiService {
  constructor() {
    super(process.env.NEXT_PUBLIC_PRODUCT_API_URL as string);
  };
  async getProductsList(options: {
    limit?: number;
    skip?: number;
    select?: string;
  } = {}): Promise<any> {
    const { limit = 30, skip = 0, select } = options ?? {};
    let url = `/products?limit=${limit}&skip=${skip}`;
    
    if (select) {
      url += `&select=${select}`;
    };
    
    return this.get(url);
  }
  async getProductById(options:{
    productId: number,
    select?: string;
  }):Promise<any>{
    const { productId , select } = options ?? {};
    let url = `/products/${productId}`;
    if (select) {
      url += `?select=${select}`;
    };
    return this.get(url);
  };
};

export const productsApi = new ProductsService();
