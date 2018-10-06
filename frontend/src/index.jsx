import React from 'react';
import ReactDOM from 'react-dom';
import Icon from "./components/Icon"
import Header from "./components/Header"

import {getForecastFromApi,getWeatherFromApi,getWeatherFromApiWithCoordinates} from "./api/weatherApi"

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      city: null,
      lat: null,
      lon: null
    };
  }

  async componentWillMount() {
    this.getWeather();
  }

  async getWeather(){
    const data = await getWeatherFromApi();
    const weather = data.weather[0];
    this.setState({city: data.name, lat: null, lon: null,icon: weather.icon.slice(0, -1)});
  }

  async getForecast(){
    const data = await getForecastFromApi();
    console.log(data);
    const weather = data.list[0].weather;
    this.setState({city: data.city.name, lat:null, lon: null, icon: weather[0].icon.slice(0, -1)});
  }

  async getLocationForWeather(){
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  async getWeatherWithCoordinates(){
    const position = await this.getLocationForWeather();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const data = await getWeatherFromApiWithCoordinates(latitude,longitude);
    const weather = data.weather[0];
    console.log(data);
    this.setState({city: data.name, lat: latitude, lon: longitude, icon: weather.icon.slice(0, -1)});
  }

  render() {
    const { icon, city, lat, lon } = this.state;

    return (
      <div>
        <nav>
          <a href="#" onClick={this.getWeather.bind(this)}>Current weather</a> |
          <a href="#" onClick={this.getForecast.bind(this)}>Forecast (3h)</a> |
          <a href="#" onClick={this.getWeatherWithCoordinates.bind(this)}>Weather on current Location</a>
        </nav>
        <Header text={"Weather in"} city={city} lat={lat} lon={lon}/>,
        <Icon icon={icon} />
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
