import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from '../swapi.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  character: any;
  species: any=[];
  movies: any=[];
  starships: any=[];

  constructor(private route: ActivatedRoute, private swapiService: SwapiService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.swapiService.getCharacter(+params.get('id')!))
    ).subscribe(character => {
      this.character = character;

      forkJoin([
        this.swapiService.getSpecies(character.species[0]),
        this.swapiService.getMovies(character.films),
        this.swapiService.getStarships(character.starships)
      ]).subscribe(([species, films, starships]) => {
        this.species = species.name;
        this.movies = films.map(film => film.title);
        this.starships = starships.map(starship => starship.name);
      });
    });
  }
}
