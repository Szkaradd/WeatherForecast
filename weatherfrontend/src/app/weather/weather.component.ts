import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../models/weather-response-model';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  cityName: string | null = null;
  weatherResponse: WeatherResponse | null = null;
  noSuchCity: string | null = null;
  loading = false;
  recentCities: string[] = [];
  favoriteCities: string[] = [];

  constructor(private weatherService: WeatherService) {}

  getWeather(cityName: string | null): void {
    console.log('getWeather');
    if (!cityName) {
      return;
    }
    this.loading = true;

    this.cityName = cityName.trim().toLowerCase();

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
          this.saveCurrentCityToLocalStorage();
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
    if (this.weatherResponse && this.weatherResponse.name) {
      const capitalizedName =
        this.weatherResponse.name.charAt(0).toUpperCase() +
        this.weatherResponse.name.slice(1);
      if (this.recentCities.indexOf(capitalizedName) === -1)
        this.recentCities.unshift(capitalizedName);
    }
    if (this.recentCities.length > 5) {
      this.recentCities.shift();
    }
    this.saveRecentCitiesToLocalStorage();
  }

  ngOnInit() {
    this.loadRecentCitiesFromLocalStorage();
    this.loadFavoriteCitiesFromLocalStorage();
    this.loadCurrentCityFromLocalStorage();
    if (this.cityName) {
      this.getWeather(this.cityName);
    }
  }

  saveRecentCitiesToLocalStorage(): void {
    localStorage.setItem('recentCities', JSON.stringify(this.recentCities));
  }

  loadRecentCitiesFromLocalStorage(): void {
    const storedCities = JSON.parse(
      localStorage.getItem('recentCities') || '[]'
    );
    this.recentCities = storedCities;
  }

  saveFavoriteCitiesToLocalStorage(): void {
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
  }

  saveCurrentCityToLocalStorage(): void {
    localStorage.setItem('currentCity', JSON.stringify(this.cityName));
  }

  loadCurrentCityFromLocalStorage(): void {
    const storedCity = JSON.parse(localStorage.getItem('currentCity') || '""');
    this.cityName = storedCity;
  }

  loadFavoriteCitiesFromLocalStorage(): void {
    const storedCities = JSON.parse(
      localStorage.getItem('favoriteCities') || '[]'
    );
    this.favoriteCities = storedCities;
  }

  addToFavorites(city: string): void {
    if (this.favoriteCities.indexOf(city) === -1) {
      this.favoriteCities.push(city);
    } else {
      this.favoriteCities.splice(this.favoriteCities.indexOf(city), 1);
    }
    this.saveFavoriteCitiesToLocalStorage();
  }

  getWeatherFromRecent(city: string): void {
    console.log('getWeatherFromRecent');
    this.getWeather(city);
  }
}
