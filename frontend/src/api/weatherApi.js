const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getWeatherFromApiWithCoordinates = async (lat,lon) => {
  try {
    console.log(lat, lon);
    const url = `${baseURL}/weather/coordinates/${lat}:${lon}`;
    console.log(url);
    const response = await fetch(url);

    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {};
};



export {getForecastFromApi,getWeatherFromApi,getWeatherFromApiWithCoordinates}
