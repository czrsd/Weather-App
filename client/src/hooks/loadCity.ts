import axios from "axios";

const loadCities = (country: string, amount: number) => {
  axios.get(`http://localhost:3000/cities/?country=${country}`).then((res) => {
    const data = res.data;
    // TODO: add max amount of how much should load (maybe in backend aswell for more performance)
  });
};

export default loadCities;
