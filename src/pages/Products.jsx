import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/productService';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log("Error in fetching products: ", err);
      toast.error(
        err?.response?.data?.message || "Failed to fetch products"
      );

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log("Products Length:",products.length)
  console.log("Products:",products)

  if (loading) {
    return <p className="p-6 text-[#704A2D]">Loading products...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#2B2520]">
        Products
      </h1>

      <p className="mt-2 text-sm text-[#81756A]">
        Total products: {products.length}
      </p>

      {/* Product components will go here */}
    </div>
  );
}

export default Products