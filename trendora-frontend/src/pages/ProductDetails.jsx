import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { FaBolt, FaShoppingBag } from "react-icons/fa";
import toast from "react-hot-toast";

import { addCartItem } from "../redux/slices/cartSlice";

import { getProductById } from "../services/productService";

const ProductDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data);
      } catch (error) {
        setProduct(null);
        setError(
          error.response?.data?.message || "Unable to load product details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = async () => {
    if (!userInfo?.token) {
      toast.error("Please login to add items to your cart.");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productId: product._id,
          qty: 1,
          token: userInfo.token,
        }),
      ).unwrap();

      toast.success("Product added to cart.");
    } catch (error) {
      toast.error(error || "Unable to add item to cart.");
    }
  };

  const buyNowHandler = async () => {
    if (!userInfo?.token) {
      toast.error("Please login to buy this product.");
      return;
    }

    const checkoutItem = {
      productId: product._id,
      name: product.title,
      price: product.price,
      qty: 1,
      image: product.image,
      category: product.category,
    };

    sessionStorage.setItem("checkoutItem", JSON.stringify(checkoutItem));
    navigate("/checkout", { state: { checkoutItem } });
  };

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-3xl mt-20">{error}</h1>;
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

          <p className="text-3xl font-bold mb-5">Rs. {product.price}</p>

          <p className="mb-8 text-lg">{product.description}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={addToCartHandler}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-lg shadow-slate-200 transition hover:border-rose-300 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:shadow-slate-950 dark:hover:border-rose-500 dark:hover:text-rose-300"
            >
              <FaShoppingBag className="text-xs" />
              Add To Cart
            </button>

            <button
              type="button"
              onClick={buyNowHandler}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-500 dark:shadow-slate-950"
            >
              <FaBolt className="text-xs" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
