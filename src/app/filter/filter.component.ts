import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-character-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class CharacterFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();
  filters = {
    name: '',
    movie: '',
    vehicle: '',
    starship: '',
    birthYear: ''
  };

  movies: string[] = ['Episode IV', 'Episode V', 'Episode VI']; // Example data
  vehicles: string[] = ['Speeder', 'X-wing']; // Example data
  starships: string[] = ['Millennium Falcon', 'Star Destroyer']; // Example data
  birthYears: string[] = ['19BBY', '22BBY']; // Example data

  onFilterChange(): void {
    this.filterChanged.emit(this.filters);
  }
}
