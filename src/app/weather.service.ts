import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Article } from './article'
import { NewsResponse } from './newsResponse'
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  api_key = 'a4575fda906b9a77bc74f04d5f7d7a26'
  baseQueryUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + this.api_key
  constructor(private http: HttpClient) { }

   // parameters are optional and can be used to search article
   getWeather(city: string) {

    // build url
    let params = new HttpParams();
    if(city)
      params = params.set('q', city);
    
    let URL = this.baseQueryUrl + '&' + params.toString();

    // fetch
    return this.http
      .get(URL)
      .pipe(
        map(data => data),
        catchError(this.handleError),
        map(data => {
          console.log("weather")
          console.log(data)
          let weather = new Weather()
          
          weather.description = data['weather'][0]['description']
          weather.icon = data['weather'][0]['icon']
          weather.wind = data['wind']['speed']
          weather.feels_like = data['main']['feels_like']
          weather.temp = data['main']['temp']
          weather.humidity = data['main']['humidity']
          return weather
        }),
        );
  }

  getWeatherByCoords(longitude, latitude) {

    // build url
    let params = new HttpParams();
    params = params.set('lat', latitude);
    params = params.set('lon', longitude);
    
    let URL = this.baseQueryUrl + '&' + params.toString();

    // fetch
    return this.http
      .get(URL)
      .pipe(
        map(data => data),
        catchError(this.handleError),
        map(data => {
          let weather = new Weather()
          
          weather.description = data['weather'][0]['description']
          weather.icon = data['weather'][0]['icon']
          weather.wind = data['wind']['speed']
          weather.feels_like = data['main']['feels_like']
          weather.temp = data['main']['temp']
          weather.humidity = data['main']['humidity']
          let city = data['name']
          return [weather, city]
        }),
        );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
