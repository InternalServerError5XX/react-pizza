import axios from "axios";
import { store } from "../../../redux/store";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

const pizzaApi = axios.create({
  baseURL: import.meta.env.VITE_PIZZA_API_URL,
});

const orderApi = axios.create({
  baseURL: import.meta.env.VITE_ORDER_API_URL,
});

const addAuthInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

addAuthInterceptor(authApi);
addAuthInterceptor(pizzaApi);
addAuthInterceptor(orderApi);

export { authApi, pizzaApi, orderApi };
