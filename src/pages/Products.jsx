import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import { getProducts } from "../services/productService";
import ProductTable from "../components/products/ProductTable";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      // The service should return the products array.
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);

      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (product) => {
    // We'll connect the confirmation modal and delete API next.
    console.log("Product selected for deletion:", product);
  };

  return (
    <div className="space-y-6">
      {/* Page heading and Add Product button */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2B2520] sm:text-3xl">
            Products
          </h1>

          <p className="mt-1 text-sm text-[#81756A]">
            Manage your Heritage Bharat product collection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E8E0D5] bg-white px-4 py-3 text-sm font-medium text-[#704A2D] transition hover:bg-[#F5F0E8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>

          <Link
            to="/products/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#704A2D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#573820] hover:shadow-md"
          >
            <Plus size={18} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Product count */}
      <div className="flex items-center justify-between rounded-xl border border-[#EAE2D7] bg-white px-5 py-4">
        <div>
          <p className="text-sm font-medium text-[#3D3025]">
            Product Collection
          </p>

          <p className="mt-1 text-xs text-[#81756A]">
            View and manage your products
          </p>
        </div>

        <span className="rounded-lg bg-[#F5F0E7] px-3 py-2 text-sm font-semibold text-[#704A2D]">
          {loading ? "..." : `${products.length} products`}
        </span>
      </div>

      {/* Reusable product table */}
      <ProductTable
        products={products}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;
