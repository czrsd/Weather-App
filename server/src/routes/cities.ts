import express, { Request, Response } from "express";
import axios from "axios";
import * as fastCsv from "fast-csv";

const router = express.Router();

interface City {
  city: string;
  country: string;
}

const citiesCsvUrl = "https://raw.githubusercontent.com/czrsd/Weather-App/main/worldcities.csv";

router.get("/cities", async (req: Request, res: Response) => {
  const countryParam = req.query.country as string;

  if (!countryParam) {
    return res.status(400).json({ error: "Country parameter is required." });
  }

  const cities: string[] = [];

  try {
    const response = await axios.get(citiesCsvUrl, { responseType: "stream" });

    fastCsv
      .parseStream(response.data, { headers: true })
      .on("data", (row: any) => {
        if (row.country && row.country.toLowerCase() === countryParam.toLowerCase()) {
          cities.push(row.city);
        }
      })
      .on("end", () => {
        res.json({ cities });
      })
      .on("error", (error: any) => {
        console.error("Error parsing CSV:", error);
        res.status(500).json({ error: "Internal server error." });
      });
  } catch (error) {
    console.error("Error fetching CSV:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
