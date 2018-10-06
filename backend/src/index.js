const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "658225";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchForecast = async () => {
  const endpoint = `${mapURI}/forecast?id=${targetCity}&appid=${appId}&`;
  console.log(`Get weather from:${endpoint}`);
  const response = await fetch(endpoint);
  return response ? response.json() : {}
};

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?id=${targetCity}&appid=${appId}&`;
  console.log(`Get weather from:${endpoint}`);
  const response = await fetch(endpoint);
  return response ? response.json() : {}
};

const fetchWeatherFromCoordinates = async (lat,lon) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&`;
  console.log(`Get weather from:${endpoint}`);
  const response = await fetch(endpoint);
  return response ? response.json() : {}
};

router.get('/api/forecast', async ctx => {
  const weatherData = await fetchForecast();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

router.get('/api/weather/coordinates/:coord', async ctx => {
  const coord = ctx.params.coord;
  const params = coord.split(":");
  const lat = params[0];
  const lon = params[1];
  console.log(`Rest call with coordinates: ${lat} / ${lon}`);
  const weatherData = await fetchWeatherFromCoordinates(lat,lon);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
