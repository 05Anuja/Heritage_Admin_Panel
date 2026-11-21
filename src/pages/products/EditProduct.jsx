import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  Upload,
  Image as ImageIcon,
  Package,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  getProductById,
  updateProduct,
} from "../../services/productService.js";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    material: "",
    flair: "",
    blouse: "",
    dupatta: "",
    features: [],
    featured: false,
    active: true,
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const product = await getProductById(id);

        if (!product) {
          setError("Product not found.");
          return;
        }

        setFormData({
          name: product.name || "",
          category: product.category || "",
          description: product.description || "",
          material: product.material || "",
          flair: product.flair || "",
          blouse: product.blouse || "",
          dupatta: product.dupatta || "",
          features: product.features || [],
          featured: product.featured ?? false,
          active: product.active ?? true,
        });

        setExistingImages(product.images || []);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add feature
  const handleAddFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, value],
    }));

    setFeatureInput("");
  };

  // Remove feature
  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Handle new images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    const totalImages = newImages.length + selectedFiles.length;

    if (totalImages > 5) {
      setError("You can upload a maximum of 5 new images.");
      e.target.value = "";
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validFiles.length !== selectedFiles.length) {
      setError("Please select only image files.");
    } else {
      setError("");
    }

    setNewImages((prev) => [...prev, ...validFiles]);

    // Allow selecting the same file again if needed
    e.target.value = "";
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateProduct({
        id,
        formData,
        images: newImages,
      });

      toast.success("Product updated successfully!");

      navigate("/products");
    } catch (err) {
      console.error("Update product error:", err);

      const errorMsg = err.response?.data?.message || "Failed to update product.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#E8E0D5] bg-white text-[#35251C] outline-none focus:border-[#987044] focus:ring-2 focus:ring-[#987044]/10 transition";

  const labelClass = "block text-sm font-semibold text-[#59483A] mb-2";

  if (loading) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <p className="text-[#795334] font-medium">Loading product...</p>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/products")}
          className="text-[#795334] font-semibold"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 md:p-8">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-[#795334] mb-4 hover:gap-3 transition-all"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-[#30231D]">
            Edit Product
          </h1>

          <p className="text-[#927B69] mt-1">
            Update your Heritage Bharat product information.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#987B61]">
          <Package size={18} />
          Product ID: {id}
        </div>
      </div>

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm p-5 md:p-7 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="text-[#795334]" size={22} />
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Basic Information
              </h2>
              <p className="text-sm text-[#927B69]">
                Enter the basic product details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter category"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter material"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Enter product description"
              />
            </div>
          </div>
        </div>

        {/* Product Images */}

        {/* Product Images */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm p-5 md:p-7 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="text-[#795334]" size={22} />
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Product Images
              </h2>
              <p className="text-sm text-[#927B69]">
                Upload multiple product images at once.
              </p>
            </div>
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#59483A] mb-3">
                Existing Images
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {existingImages.map((image, index) => (
                  <div
                    key={index}
                    className="h-36 rounded-xl border border-[#E8E0D5] overflow-hidden bg-[#FAF8F4]"
                  >
                    <img
                      src={image}
                      alt={`Existing product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Area */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#DCCBBC] rounded-xl p-8 cursor-pointer hover:bg-[#FAF8F4] transition">
            <Upload size={30} className="text-[#987044] mb-3" />

            <span className="font-semibold text-[#59483A]">
              Click to upload images
            </span>

            <span className="text-sm text-[#987B61] mt-2">
              Select multiple PNG, JPG or WEBP images
            </span>

            <span className="text-xs text-[#987B61] mt-1">
              Maximum 5 new images
            </span>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* Selected Images Preview */}
          {newImages.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#59483A]">
                  Selected Images
                </h3>

                <span className="text-xs bg-[#F5EFE7] text-[#795334] px-3 py-1 rounded-full">
                  {newImages.length} / 5 images
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {newImages.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative group h-36 rounded-xl overflow-hidden border border-[#E8E0D5]"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setNewImages((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow hover:bg-red-50"
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 truncate">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-amber-700 mt-4">
            Uploading new images replaces all existing images. If no new images
            are selected, existing images remain unchanged.
          </p>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm p-5 md:p-7 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#795334]" size={22} />
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Product Specifications
              </h2>
              <p className="text-sm text-[#927B69]">
                Update product specifications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>Flair</label>
              <input
                type="text"
                name="flair"
                value={formData.flair}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter flair"
              />
            </div>

            <div>
              <label className={labelClass}>Blouse</label>
              <input
                type="text"
                name="blouse"
                value={formData.blouse}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter blouse details"
              />
            </div>

            <div>
              <label className={labelClass}>Dupatta</label>
              <input
                type="text"
                name="dupatta"
                value={formData.dupatta}
                onChange={handleChange}
                className={inputClass}
                placeholder="Enter dupatta details"
              />
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm p-5 md:p-7 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-[#795334]" size={22} />
            <div>
              <h2 className="text-lg font-bold text-[#30231D]">
                Product Features
              </h2>
              <p className="text-sm text-[#927B69]">
                Add or remove product features.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              placeholder="Enter a product feature"
              className={inputClass}
            />

            <button
              type="button"
              onClick={handleAddFeature}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#795334] text-white rounded-xl hover:bg-[#634329] transition shrink-0"
            >
              <Plus size={18} />
              Add Feature
            </button>
          </div>

          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-[#FAF8F4] border border-[#EEE7DF] rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Sparkles size={17} className="text-[#987044]" />
                  <span className="text-[#59483A]">{feature}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                  title="Remove feature"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}

            {formData.features.length === 0 && (
              <p className="text-sm text-[#987B61]">No features added.</p>
            )}
          </div>
        </div>

        {/* Product Status */}
        <div className="bg-white rounded-2xl border border-[#E8E0D5] shadow-sm p-5 md:p-7 mb-6">
          <h2 className="text-lg font-bold text-[#30231D] mb-5">
            Product Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Product Visibility</label>

              <select
                name="active"
                value={String(formData.active)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    active: e.target.value === "true",
                  }))
                }
                className={inputClass}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Featured Product</label>

              <select
                name="featured"
                value={String(formData.featured)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.value === "true",
                  }))
                }
                className={inputClass}
              >
                <option value="true">Featured</option>
                <option value="false">Not Featured</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/products")}
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-[#E8E0D5] text-[#795334] font-semibold hover:bg-[#F5F0E9] transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#795334] text-white font-semibold hover:bg-[#634329] transition disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
