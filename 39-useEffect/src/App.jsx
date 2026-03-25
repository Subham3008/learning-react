import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [cityName, setCityName] = useState(null);
  const [weather, setWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loding, setLoading] = useState(false);

  /*getTempareture */
  let getTempareture = async () => {
    try {
      let res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true`,
      );
      setWeather(res.data.current_weather.temperature);
    } catch (error) {
      console.log("Error while fetching temperature->", error);
    } finally {
      setLoading(false);
    }
  };

  /*getCoordinate */
  let getCoordinate = async (city) => {
    let res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`,
    );

    setCoordinates(res.data.results[0]);
  };

  /*handleChange */
  let handleChange = () => {
    setWeather(null)
    getCoordinate(cityName);
    setLoading(true);
  };

  useEffect(() => {
    if (coordinates) {
      getTempareture();
    }
  }, [coordinates]);

  return (
    <div>
      <input
        onChange={(e) => {
          setCityName(e.target.value);
        }}
        type="text"
        placeholder="write a city name"
      />
      <button onClick={handleChange}>Check</button>
      {loding && <h1>Loading...</h1>}
      {weather && <h1>Tempareture is {weather} deg</h1>}
    </div>
  );
};

export default App;
