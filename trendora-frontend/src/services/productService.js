import API from "./api";

// GET ALL PRODUCTS
export const getProducts = async () => {
  const response = await API.get("/products");

  return response.data;
};

// GET SINGLE PRODUCT
export const getProductById = async (id) => {
  const response = await API.get(`/products/${id}`);

  return response.data;
};
