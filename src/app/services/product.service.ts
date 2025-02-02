import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Product} from "./dto/product.dto";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_BASE_URL = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  /** Fetch all products */
  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}`);
  }

  /** Fetch a single product by ID */
  fetchProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_BASE_URL}/${productId}`);
  }

  /** Fetch products by category */
  fetchProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}/category/${category}`);
  }

  /** Fetch all product categories */
  fetchCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE_URL}/categories`);
  }

  /** Search for products by title */
  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}`).pipe(
      // Filter products by title matching the search query
      map(products =>
        products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
