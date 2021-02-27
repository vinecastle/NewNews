import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather = new Weather()
  city = 'Funchal'
  error: any
  constructor(private weatherService: WeatherService) { }
  
  getWeather(city): void {
    this.weatherService
      .getWeather(city)
      .subscribe(
        weather => {
          this.weather = weather
          console.log(weather)
        },
        error => (this.error = error)
      )
  }

  getImageURL(){
    // weather not loaded
    if(!this.weather.icon)
      return ""

    return "http://openweathermap.org/img/wn/" + this.weather.icon + "@2x.png"
  }

  getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => { 
        resolve(position.coords);
      }, (err) => {
        reject(err);
      });
    });

  }
  

  ngOnInit(): void {
    this.getWeather(this.city)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
         const longitude = position.coords.longitude;
         const latitude = position.coords.latitude;
         console.log("test2")
         this.weatherService.getWeatherByCoords(longitude, latitude).subscribe(
          data => {
            this.weather = data[0]
            this.city = data[1]
          },
          error => (this.error = error)
        )
      });
  } else {
     console.log("No support for geolocation")
  }
  }

  //a6a3d278109fb89e0b85b3a3ea3b7772
}
