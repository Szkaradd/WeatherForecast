export interface WeatherResponse {
  main: Main;
  name: string;
  wind: Wind;
  clouds: Clouds;
  weather: Weather[];
  openAIDescription?: string;
  dt: number;
  sys: Sys;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}
