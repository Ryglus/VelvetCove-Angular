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

  fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}`);
  }

  fetchProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_BASE_URL}/${productId}`);
  }

  fetchProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}/category/${category}`);
  }

  fetchCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_BASE_URL}/categories`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_BASE_URL}`).pipe(
      map(products =>
        products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }
}
