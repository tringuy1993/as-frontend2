import useSWR from "swr";
import axios from "axios";
import { BASE_URL } from "./apiURLs";
import { Auth } from "@/app/authentication/firebase1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosFetcher = async (url, params = {}) => {
  //getIdToken() to ensure that the token is always updated.
  const token = await Auth.currentUser?.getIdToken();
  try {
    const response = await axiosInstance.get(url, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

function useCustomSWR(url, params = {}, swrOptions = {}) {
  const { data, error, ...rest } = useSWR(
    [url, params],
    () => axiosFetcher(url, params),
    swrOptions,
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    ...rest,
  };
}

export default useCustomSWR;
