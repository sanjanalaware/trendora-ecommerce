import API from "./api";

export const createOrder = async (orderData, token) => {
  const response = await API.post("/orders", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getMyOrders = async (token) => {
  const response = await API.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getAllOrders = async (token) => {
  const response = await API.get("/orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const updateOrderStatus = async (id, status, token) => {
  const response = await API.put(
    `/orders/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
