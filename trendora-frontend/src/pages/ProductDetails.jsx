import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";

import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    dispatch(
      addToCart({
        ...product,
        qty: 1,
      }),
    );

    alert("Product Added To Cart");
  };

  if (!product) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  return (
    <div className="min-h-screen px-10 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-2xl"
        />

        <div>
          <h1 className="text-5xl font-bold mb-5">{product.title}</h1>

          <p className="text-gray-500 mb-5">{product.category}</p>

          <p className="text-3xl font-bold mb-5">₹{product.price}</p>

          <p className="mb-8 text-lg">{product.description}</p>

          <button
            onClick={addToCartHandler}
            className="bg-black text-white px-8 py-4 rounded-xl"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
