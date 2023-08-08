import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../models/weather-response-model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly BASE_URL = 'http://localhost:8080/weather';

  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(`${this.BASE_URL}?city=${city}`);
  }
}
