import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback } from 'react';
import { useState } from 'react';
const WeatherBox = (props) => {
  const [weather, setWeather] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const handleCityChange = useCallback((city) => {
    //useCallback doesn't refresh chidren element PickCity when parent component WeatherBox is refreshed
    setPending(true);
    setWeather(false);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d77f935b2221b70aa3dda57f36069a47&units=metric`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((data) => {
            const weatherData = {
              city: data.name,
              temp: data.main?.temp,
              icon: data.weather && data.weather[0] ? data.weather[0].icon : undefined,
              description: data.weather && data.weather[0] ? data.weather[0].main : undefined,
            };
            setWeather(weatherData);
          });
        } else {
          setError(true);
        }
        setPending(false);
      })
      .catch(() => {
        setPending(false);
        setError(true);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weather && !error && <WeatherSummary {...weather} />}
      {!weather && pending && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
