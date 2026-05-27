import API from "./api";

// ADD TO WISHLIST
export const addToWishlist = async (productId, token) => {
  const response = await API.post(
    "/wishlist",
    {
      productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

// GET WISHLIST
export const getWishlist = async (token) => {
  const response = await API.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// REMOVE WISHLIST ITEM
export const removeWishlistItem = async (id, token) => {
  const response = await API.delete(`/wishlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
