import React from 'react';
{/* @ts-ignore */}
import vector1 from "./assets/Vector1.png";
{/* @ts-ignore */}
import vector2 from "./assets/Vector2.png";
{/* @ts-ignore */}
import search from "./assets/search.png";
import fetchWeather from './hooks/fetchWeather';

const keyDownEvent = (event: any) => {
  if (event.key === "Enter") {
    fetchWeather();
  }
}

function App() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center bg-gray-900'>
      <div className="flex flex-col p-20 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-2xl text-white relative">
        <h1 className='text-4xl font-bold mb-4 text-center'>Weather App</h1>
        <hr className='mb-8' />
        <div className="bg-white rounded-full overflow-hidden flex gap-4 p-3">
          <input
            type="text"
            className="text-black outline-none w-full"
            data-id="query"
            minLength={1}
            maxLength={100}
            placeholder='Search City or Country'
            onKeyDown={keyDownEvent}
          />
          <button className='bg-transparent border-none' onClick={fetchWeather}>
            <img src={search} alt="Search Icon" draggable={false}/>
          </button>
        </div>
        <img src={vector1} alt="Vector 1" className="absolute top-0 right-0 pointer-events-none" />
        <img src={vector2} alt="Vector 2" className="absolute top-10 left-0 pointer-events-none" />
        <div className="flex gap-2 mt-3">
          <button className="bg-blue-600 rounded-xl p-2 w-full transition-all duration-300 hover:bg-blue-700" data-id="btn_favorites">Favorites</button>
          <button className="bg-blue-600 rounded-xl p-2 w-full transition-all duration-300 hover:bg-blue-700" data-id="btn_popular">Popular</button>
        </div>
        <div data-id="weatherData" className='flex flex-col gap-1 items-center mt-5'></div>
      </div>
    </div>
  );
}

export default App;
