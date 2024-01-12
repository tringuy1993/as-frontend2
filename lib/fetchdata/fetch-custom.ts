import { Auth } from "@/app/authentication/firebase1";
import useSWR from "swr";
import axios from "axios";
import { BASE_URL } from "./apiURLs";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const axiosFetcher = async (url, params = {}, options = {}) => {
  // getIdToken() to ensure that the token is always updated.
  const token = await Auth.currentUser?.getIdToken();
  try {
    const response = await axiosInstance.get(url, {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...options,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

function useCustomSWR(url, params = {}, swrOptions = {}) {
  const { data, error, ...rest } = useSWR(
    [url, params],
    () => axiosFetcher(url, params, swrOptions),
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
