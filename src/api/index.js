import axios from "axios";
import { BASE_URL } from "../constants";

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/item`);
  return response;
};

export const getUser = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response;
};

export const getUserOrders = async (userId) => {
  const response = await axios.get(`${BASE_URL}/order/${userId}`);
  return response;
};

export const signUp = async (params) => {
  const response = await axios.post(`${BASE_URL}/auth/signUp`, params);
  return response;
};

export const signIn = async (params) => {
  const response = await axios.post(`${BASE_URL}/auth/signIn`, params);
  return response;
};

export const createOrder = async (params) => {
  const response = await axios.post(`${BASE_URL}/order/create`, params);
  return response;
};
