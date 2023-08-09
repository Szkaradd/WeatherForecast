import { Component, Input } from '@angular/core';
import { WeatherResponse } from '../models/weather-response-model';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent {
  @Input() weatherResponse: WeatherResponse | null = null;

  constructor() {}

  getWeatherIconUrl(): string | null {
    if (!this.weatherResponse || !this.weatherResponse.weather) {
      return null;
    }

    const icon = this.weatherResponse.weather[0].icon;
    return 'http://openweathermap.org/img/w/' + icon + '.png';
  }

  getWeatherTime() {
    if (!this.weatherResponse) {
      return null;
    }
    return new Date(this.weatherResponse.dt * 1000).toLocaleTimeString();
  }

  getSunsetTime() {
    if (!this.weatherResponse || !this.weatherResponse.sys) {
      return null;
    }
    return new Date(
      this.weatherResponse.sys.sunset * 1000
    ).toLocaleTimeString();
  }
  getSunriseTime() {
    if (!this.weatherResponse || !this.weatherResponse.sys) {
      return null;
    }
    return new Date(
      this.weatherResponse.sys.sunrise * 1000
    ).toLocaleTimeString();
  }
}
