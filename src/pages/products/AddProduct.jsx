import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ProductForm from "../../components/forms/ProductForm.jsx";
import { addProduct } from "../../services/productService.js";

const AddProduct = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleAddProduct = async ({ formData, images }) => {
    try {
      setSubmitting(true);

      await addProduct({ formData, images });

      toast.success("Product added successfully!");
      navigate("/products");
    } catch (error) {
      console.error("Add product error:", error);

      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#2B2520] sm:text-3xl">
          Add Product
        </h1>
        <p className="mt-1 text-sm text-[#81756A]">
          Add a new product to the Heritage Bharat collection.
        </p>
      </div>

      <ProductForm onSubmit={handleAddProduct} submitting={submitting} />
    </div>
  );
};

export default AddProduct;
