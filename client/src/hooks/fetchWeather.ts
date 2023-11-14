import axios from "axios";
interface WeatherData {
  query: string;
}

const fetchWeather = async () => {
  const inputElement = document.querySelector<HTMLInputElement>("[data-id='query']");
  const weatherDataElement = document.querySelector<HTMLInputElement>("[data-id='weatherData']");
  const query = inputElement?.value;

  if (query) {
    try {
      const response = await axios.post("http://localhost:3000/getWeather", {
        query: query,
      } as WeatherData);

      inputElement.value = "";

      const data = response.data;

      if (weatherDataElement) {
        const location = data.weatherData.location;
        const current = data.weatherData.current;

        if (location && current) {
          weatherDataElement.innerHTML = `
              <div class="flex items-center gap-5">
                <div class="rounded-2xl overflow-hidden">
                  <div class="w-[50px] h-[50px] rounded-2xl bg-cover bg-center" style="background-image: url('https://flagsapi.com/${
                    data.countryCode
                  }/flat/64.png')"></div>
                </div>
                <div class="flex flex-col">
                  <span class="text-xl">${location.country}</span>
                  <span class="text-lg">${location.name}</span>
                </div>
              </div>
              <div class="flex items-center">
                <img src="${current.condition?.icon || ""}" />
                <span class="text-3xl">${current.temp_c}°C</span>
              </div>
              <span class="text-xl">${current.wind_kph}km/h wind speed</span>
              <span class="text-sm">${location.localtime}</span>
            `;
        } else {
          console.error("Invalid data structure:", data);
          if (weatherDataElement) {
            weatherDataElement.innerHTML = `<span class="text-red-500">Couldn't find your Location :(</span>`;
          }
        }
      }
    } catch (error) {
      if (weatherDataElement) {
        weatherDataElement.innerHTML = `<span class="text-red-500 text-xl">Couldn't find your Location :(</span>`;
      }
    }
  }
};
export default fetchWeather;
