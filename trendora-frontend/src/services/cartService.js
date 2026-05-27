import API from "./api";

// ADD TO CART
export const addToCart = async (productId, qty, token) => {
  const response = await API.post(
    "/cart",
    {
      productId,
      qty,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// GET USER CART
export const getCart = async (token) => {
  const response = await API.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// REMOVE CART ITEM
export const removeCartItem = async (id, token) => {
  const response = await API.delete(`/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
