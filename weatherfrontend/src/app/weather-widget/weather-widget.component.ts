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
}
