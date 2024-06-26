import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  filteredCharacters: any[] = [];
  filters: any = {
    name: '',
    movie: '',
    vehicle: '',
    starship: '',
    birthYear: ''
  };

  movies: any= []; // Define movies array
  vehicles:any = []; // Define vehicles array
  starships: any = []; // Define starships array
  birthYears: string[] = []; // Define birth years array


  constructor(
    private swapiService: SwapiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters.name = params['name'] || '';
      this.filters.movie = params['movie'] || '';
      this.filters.vehicle = params['vehicle'] || '';
      this.filters.starship = params['starship'] || '';
      this.filters.birthYear = params['birthYear'] || '';

      this.fetchCharacters();
    });
  }

  private fetchCharacters(): void {
    this.swapiService.getCharacters().subscribe(
      (response: any) => {
        this.characters = response.results; // Assuming response.results contains the array of characters
        this.filteredCharacters = this.filterCharacters();
        this.extractFilterOptions();
        console.log(this.characters)
      },
      (error: any) => {
        console.error('Error fetching characters:', error);
      }
    );
  }

  onFilterChange(): void {
    const queryParams = {
      name: this.filters.name,
      movie: this.filters.movie,
      vehicle: this.filters.vehicle,
      starship: this.filters.starship,
      birthYear: this.filters.birthYear
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.filteredCharacters = this.filterCharacters();
  }

  private filterCharacters(): any[] {
    if (!Array.isArray(this.characters)) {
      return [];
    }

    return this.characters.filter(character =>
      this.filterByName(character) &&
      this.filterByMovie(character) &&
      this.filterByVehicle(character) &&
      this.filterByStarship(character) &&
      this.filterByBirthYear(character)
    );
  }

  private filterByName(character: any): boolean {
    return !this.filters.name || character.name.toLowerCase().includes(this.filters.name.toLowerCase());
  }

  private filterByMovie(character: any): boolean {
    return !this.filters.movie || character.films.includes(this.filters.movie);
  }

  private filterByVehicle(character: any): boolean {
    return !this.filters.vehicle || character.vehicles.includes(this.filters.vehicle);
  }

  private filterByStarship(character: any): boolean {
    return !this.filters.starship || character.starships.includes(this.filters.starship);
  }

  private filterByBirthYear(character: any): boolean {
    if (!this.filters.birthYear) {
      return true;
    }
    const characterBirthYear = parseInt(character.birth_year);
    const selectedBirthYear = parseInt(this.filters.birthYear);
    return characterBirthYear === selectedBirthYear;
  }

  private extractFilterOptions(): void {
    const uniqueMovies = new Set();
    const uniqueVehicles = new Set();
    const uniqueStarships = new Set();
    const birthYears: number[] = [];

    this.characters.forEach(character => {
      character.films.forEach((film: string) => uniqueMovies.add(film));
      character.vehicles.forEach((vehicle: string) => uniqueVehicles.add(vehicle));
      character.starships.forEach((starship: string) => uniqueStarships.add(starship));

      const birthYear = parseInt(character.birth_year);
      if (!isNaN(birthYear)) {
        birthYears.push(birthYear);
      }
    });

    this.movies = Array.from(uniqueMovies);
    this.vehicles = Array.from(uniqueVehicles);
    this.starships = Array.from(uniqueStarships);
    this.birthYears = birthYears.sort((a, b) => a - b).map(year => year.toString());
  }

  selectCharacter(character: any): void {
    console.log('Selected character:', character);
    this.router.navigate(['/character-details', character.url.split('/').slice(-2, -1)[0]]); // Adjust the navigation as needed
  }
}
