import express from "express";
import fetch from "../helpers/fetch.js";
import "../helpers/env.js";

const router = express.Router();
const apiKey = process.env.API_KEY;

router.post("/getWeather", async (req, res) => {
  try {
    const query: string = req.body.query;
    if (!query || typeof query !== "string") {
      throw new Error("Invalid or missing query parameter.");
    }

    const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

    // Fetch weather data
    const weatherData = await fetch(weatherApiUrl);
    // Fetch country Data (country code)
    const countryData = await fetch(
      `https://restcountries.com/v2/name/${encodeURIComponent(weatherData.location.country)}`
    );

    if (countryData.length === 0) {
      res.status(500).json({ error: "Error fetching country" });
      return;
    }

    const countryCode = countryData[0].alpha2Code;

    res.json({ countryCode, weatherData });
  } catch (error: any) {
    console.error("Error in /getWeather route:", error.message);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

export default router;
