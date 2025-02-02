import {Component, EventEmitter, Input, numberAttribute, Output, Signal, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() nameFilter = '';
  @Input({transform: numberAttribute}) minPrice?: number;
  @Input({transform: numberAttribute}) maxPrice?: number;
  @Input({transform: numberAttribute}) minRating?: number;
  @Input() categoryFilter: string | null = null;
  @Input() categories: string[] = [];

  @Output() nameChange = new EventEmitter<string>();
  @Output() minPriceChange = new EventEmitter<number | undefined>();
  @Output() maxPriceChange = new EventEmitter<number | undefined>();
  @Output() minRatingChange = new EventEmitter<number | undefined>();
  @Output() categoryChange = new EventEmitter<string | null>();
  @Output() clearFilters = new EventEmitter<void>();

  searchTerm = signal(this.nameFilter);
  localPriceRange = signal<[number, number]>([this.minPrice || 0, this.maxPrice || 1000]);

  updateName() {
    this.nameChange.emit(this.searchTerm());
  }

  updatePriceRange() {
    this.minPriceChange.emit(this.localPriceRange()[0]);
    this.maxPriceChange.emit(this.localPriceRange()[1]);
  }

  handleClearFilter(filterType: string) {
    switch (filterType) {
      case 'name':
        this.searchTerm.set('');
        this.nameChange.emit('');
        break;
      case 'category':
        this.categoryChange.emit(null);
        break;
      case 'price':
        this.localPriceRange.set([0, 1000]);
        this.minPriceChange.emit(undefined);
        this.maxPriceChange.emit(undefined);
        break;
      case 'rating':
        this.minRatingChange.emit(undefined);
        break;
    }
  }
}
