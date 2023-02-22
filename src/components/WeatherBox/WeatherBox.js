import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';
import { useState } from 'react';
const WeatherBox = (props) => {
  const [weatherData, setWeatherData] = useState('');

  const handleCityChange = useCallback(
    (city) => {
      //useCallback don't refresh chidren element PickCity when parent component WeatherBox is refreshed
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d77f935b2221b70aa3dda57f36069a47&units=metric`
      )
        .then((res) => res.json())
        .then((data) => {
          const weather = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeatherData(weather);
        });
    },
    [weatherData]
  );

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary {...weatherData} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
