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

// CREATE PRODUCT
export const createProduct = async (productData) => {
  const response = await API.post("/products", productData);

  return response.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);

  return response.data;
};

// DELETE PRODUCT
export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);

  return response.data;
};
