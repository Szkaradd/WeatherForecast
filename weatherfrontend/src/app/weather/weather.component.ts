import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../models/weather-response-model';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  cityName: string | null = null;
  weatherResponse: WeatherResponse | null = null;
  noSuchCity: string | null = null;
  loading = false;
  recentCities: String[] = [];
  favoriteCities: String[] = [];

  constructor(private weatherService: WeatherService) {}

  getWeather(): void {
    if (!this.cityName) {
      return;
    }
    this.cityName = this.cityName.trim().toLowerCase();

    this.loading = true;

    this.weatherService
      .getWeatherForCity(this.cityName)
      .pipe(
        map((response) => {
          if (response && response.main) {
            response.main.temp = Math.round(response.main.temp);
          }
          return response;
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.weatherResponse = response;
          this.noSuchCity = null;
          this.addToRecentCities();
        },
        error: (error) => {
          this.weatherResponse = null;
          if (error.status === 404) {
            this.noSuchCity = 'City: ' + this.cityName + ' not found.';
          } else {
            alert(
              'An error occurred while retrieving weather data. Please try again later.'
            );
          }
        },
      });
  }

  addToRecentCities(): void {
    if (this.cityName) {
      const capitalizedName =
        this.cityName.charAt(0).toUpperCase() + this.cityName.slice(1);
      this.recentCities.push(this.cityName);
    }
    if (this.recentCities.length > 5) {
      this.recentCities.shift();
    }
  }
}
