import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.css'],
})
export class CityItemComponent {
  @Input() cityName: string | null = null;
  @Input() isFavorite = false;
  @Output() favorited = new EventEmitter<string>();
  @Output() clicked = new EventEmitter<string>();

  toggleFavoriteStatus($event: MouseEvent): void {
    this.isFavorite = !this.isFavorite;
    $event.stopPropagation();
    console.log('addToFavorites');
    if (!this.cityName) {
      return;
    }
    this.favorited.emit(this.cityName);
  }
  cityClicked(): void {
    console.log('cityClicked');
    if (!this.cityName) {
      return;
    }
    this.clicked.emit(this.cityName);
  }
}
