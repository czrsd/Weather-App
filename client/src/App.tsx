import React, { useState } from "react";
import Vector1 from "./assets/Vector1.png";
import Vector2 from "./assets/Vector2.png";
import search from "./assets/search.png";
import fetchWeather from "./hooks/fetchWeather";
import countryList from "./hooks/countryList";

const keyDownEvent = (event: any) => {
  if (event.key === "Enter") {
    fetchWeather("");
  }
};

const onfetchWeatherClick = () => {
  fetchWeather("");
}

const toggleDropdown = () => {
  countryList.toggle();
};

const searchCountry = (event: React.KeyboardEvent<HTMLInputElement>) => {
  const query = (event.target as HTMLInputElement).value;
  countryList.search(query);
};

function App() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-gray-900">
      <div className="flex flex-col p-20 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-2xl text-white relative">
        <h1 className="text-4xl font-bold mb-4 text-center">Weather App</h1>
        <hr className="mb-8" />
        <div className="bg-white rounded-full overflow-hidden flex gap-4 p-3">
          <input
            type="text"
            className="text-black outline-none w-full"
            data-id="query"
            minLength={1}
            maxLength={100}
            placeholder="Search City or Country"
            onKeyDown={keyDownEvent}
          />
          <button className="bg-transparent border-none" onClick={onfetchWeatherClick}>
            <img src={search} alt="Search Icon" draggable={false} />
          </button>
        </div>
        <img src={Vector1} alt="Vector 1" className="absolute top-0 right-0 pointer-events-none" />
        <img src={Vector2} alt="Vector 2" className="absolute top-10 left-0 pointer-events-none" />
        <div className="flex flex-col gap-2 mt-3 relative">
          <button
            className="bg-slate-100 text-stone-900 font-semibold rounded-full p-3 w-full flex justify-between items-center"
            data-id="btn_countries"
            onClick={toggleDropdown}>
            Countries
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 330 330">
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              />
            </svg>
          </button>
          <div
            data-id="country_dropdown-container"
            className="hidden flex-col gap-2 bg-slate-100 text-black/80 rounded-b-xl p-2 pt-0 absolute top-[48px] left-0 min-w-[253px]">
            <div className="bg-white rounded-full overflow-hidden flex gap-4 p-2 w-full">
              <input
                type="text"
                className="text-black outline-none w-full"
                data-id="searchCountryQuery"
                minLength={1}
                maxLength={100}
                placeholder="Search Country"
                onKeyDown={searchCountry}
              />
            </div>
            <div data-id="country_dropdown" className="overflow-y-auto max-h-[200px]"></div>
          </div>
          <button
            className="bg-blue-600 rounded-xl p-2 w-full transition-all duration-300 hover:bg-blue-700"
            data-id="btn_favorites">
            Favorites
          </button>
        </div>
        <div data-id="weatherData" className="flex flex-col gap-1 items-center mt-5"></div>
      </div>
    </div>
  );
}

export default App;
