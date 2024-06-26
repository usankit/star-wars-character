import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl: string = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/`);
  }

  getCharacter(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/people/${id}/`);
  }

  getSpecies(url: string): Observable<any> {
    return this.http.get(url);
  }

  getMovies(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get(url)));
  }

  getStarships(urls: string[]): Observable<any[]> {
    return forkJoin(urls.map(url => this.http.get(url)));
  }
}
