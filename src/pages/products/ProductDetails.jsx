import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Package,
  Image as ImageIcon,
  CalendarDays,
  Layers,
  Shirt,
  Sparkles,
  Tag,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

import { getProductById } from "../../services/productService.js";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        if (!data) {
          setError("Product not found");
          return;
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Unable to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-[#795334]">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error || "Product not found"}</p>
        <button
          onClick={() => navigate("/products")}
          className="text-[#795334] font-semibold"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const InfoItem = ({ label, value, icon: Icon }) => (
    <div className="bg-[#FAF8F4] rounded-xl p-4">
      <div className="flex items-center gap-2 text-[#987B61] mb-2">
        {Icon && <Icon size={16} />}
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-[#35251C] font-semibold">{value || "Not specified"}</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-[#FAF9F6] min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-[#795334] mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#30231D]">
            Product Details
          </h1>

          <p className="text-[#927B69] mt-1">
            View complete product information
          </p>
        </div>

        <button
          onClick={() => navigate(`/products/edit/${product._id}`)}
          className="flex items-center gap-2 bg-[#795334] text-white px-5 py-3 rounded-xl hover:bg-[#634329] transition"
        >
          <Pencil size={17} />
          Edit Product
        </button>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-5 shadow-sm">
          <div className="bg-[#FAF8F4] rounded-xl overflow-hidden h-[350px] md:h-[450px] flex items-center justify-center">
            {product.images?.length > 0 ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <ImageIcon size={60} className="text-[#C7B6A4]" />
            )}
          </div>

          {product.images?.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-[#795334]"
                      : "border-[#E8E0D5]"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Overview */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-5">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.active
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {product.active ? "Active" : "Inactive"}
            </span>

            {product.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium flex items-center gap-1">
                <Star size={14} fill="currentColor" />
                Featured
              </span>
            )}
          </div>

          {/* <p className="text-sm text-[#987B61] mb-2">
            Product ID: {product._id}
          </p> */}

          <h2 className="text-2xl md:text-3xl font-bold text-[#30231D] mb-4">
            {product.name}
          </h2>

          <div className="border-t border-[#EEE7DF] pt-5">
            <h3 className="font-semibold text-[#30231D] mb-3">
              Product Description
            </h3>

            <p className="text-[#806E60] leading-7">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <InfoItem label="Category" value={product.category} icon={Tag} />

            <InfoItem label="Material" value={product.material} icon={Layers} />
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Package className="text-[#795334]" size={22} />
          <h2 className="text-xl font-bold text-[#30231D]">
            Product Specifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoItem label="Flair" value={product.flair} icon={Sparkles} />

          <InfoItem label="Blouse" value={product.blouse} icon={Shirt} />

          <InfoItem label="Dupatta" value={product.dupatta} icon={Layers} />
        </div>
      </div>

      {/* Product Features */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-5">
          <Sparkles className="text-[#795334]" size={22} />
          <h2 className="text-xl font-bold text-[#30231D]">Product Features</h2>
        </div>

        {product.features?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#FAF8F4] p-4 rounded-xl"
              >
                <CheckCircle size={18} className="text-[#987044] shrink-0" />
                <span className="text-[#59483A]">{feature}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#987B61]">No features added.</p>
        )}
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-2xl border border-[#E8E0D5] p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <CalendarDays className="text-[#795334]" size={22} />
          <h2 className="text-xl font-bold text-[#30231D]">
            Additional Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem
            label="Created At"
            value={
              product.createdAt
                ? new Date(product.createdAt).toLocaleString()
                : "Not available"
            }
            icon={CalendarDays}
          />

          <InfoItem
            label="Last Updated"
            value={
              product.updatedAt
                ? new Date(product.updatedAt).toLocaleString()
                : "Not available"
            }
            icon={CalendarDays}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
