import axios from "axios";

let ip: string = "";

const location = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const data = response.data;
    ip = data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error.message);
  }
};

export default location;
