import axios, { AxiosResponse, AxiosError } from "axios";

interface FetchOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: AxiosError) => void;
}

async function fetch(url: string, options?: FetchOptions) {
  return axios
    .get(url)
    .then((response: AxiosResponse<any>) => {
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
      return response.data;
    })
    .catch((error: AxiosError) => {
      if (options?.onError) {
        options.onError(error);
      } else {
        console.error("Error fetching data:", error.message);
      }
      throw error;
    });
}

export default fetch;
