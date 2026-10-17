import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Save,
  Trash2,
  X,
  Package,
} from "lucide-react";
import toast from "react-hot-toast";

const initialFormData = {
  name: "",
  category: "",
  description: "",
  material: "",
  flair: "",
  blouse: "",
  dupatta: "",
  features: [""],
  featured: false,
  active: true,
};

const ProductForm = ({ onSubmit, submitting = false }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const previews = images.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const inputClass =
    "w-full rounded-xl border border-[#E8E0D5] bg-white px-4 py-3 text-sm text-[#2B2520] outline-none transition placeholder:text-[#B0A69B] focus:border-[#A17B50] focus:ring-2 focus:ring-[#A17B50]/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClass = "mb-2 block text-sm font-medium text-[#49392C]";

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;

      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features:
        prev.features.length > 1
          ? prev.features.filter((_, i) => i !== index)
          : [""],
    }));
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    const validFiles = selectedFiles.filter((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name}: Use JPG, PNG, or WebP images.`);
        return false;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name}: Image size must be under 5 MB.`);
        return false;
      }

      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);

    // Allow selecting the same file again after removing it.
    event.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (images.length === 0) {
      toast.error("Please select at least one product image.");
      return;
    }

    const cleanedData = {
      ...formData,
      name: formData.name.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      material: formData.material.trim(),
      flair: formData.flair.trim(),
      blouse: formData.blouse.trim(),
      dupatta: formData.dupatta.trim(),
      features: formData.features
        .map((feature) => feature.trim())
        .filter(Boolean),
    };

    if (!cleanedData.name || !cleanedData.category) {
      toast.error("Product name and category are required.");
      return;
    }

    onSubmit?.({
      formData: cleanedData,
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <section className="rounded-2xl border border-[#EAE2D7] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-xl bg-[#F5F0E8] p-3 text-[#704A2D]">
            <Package size={21} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#2B2520]">
              Basic Information
            </h2>
            <p className="mt-1 text-sm text-[#81756A]">
              Enter the main details of your product.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Product Name <span className="text-red-500">*</span>
            </label>

            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Premium Ajrakh Cotton Chaniya"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Category <span className="text-red-500">*</span>
            </label>

            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Cotton"
              required
              disabled={submitting}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputClass}
              placeholder="Describe the product, its craftsmanship, and unique details..."
              rows={4}
              disabled={submitting}
            />
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="rounded-2xl border border-[#EAE2D7] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#2B2520]">
            Product Specifications
          </h2>
          <p className="mt-1 text-sm text-[#81756A]">
            Add material and garment details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="material" className={labelClass}>
              Material
            </label>

            <input
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. Cotton"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="flair" className={labelClass}>
              Flair
            </label>

            <input
              id="flair"
              name="flair"
              value={formData.flair}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 6.30 MTR"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="blouse" className={labelClass}>
              Blouse
            </label>

            <input
              id="blouse"
              name="blouse"
              value={formData.blouse}
              onChange={handleChange}
              className={inputClass}
              placeholder="Blouse details"
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="dupatta" className={labelClass}>
              Dupatta
            </label>

            <input
              id="dupatta"
              name="dupatta"
              value={formData.dupatta}
              onChange={handleChange}
              className={inputClass}
              placeholder="Dupatta details"
              disabled={submitting}
            />
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="rounded-2xl border border-[#EAE2D7] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#2B2520]">
            Product Images <span className="text-red-500">*</span>
          </h2>
          <p className="mt-1 text-sm text-[#81756A]">
            Upload one or more images. JPG, PNG, and WebP are supported, up to 5
            MB per image.
          </p>
        </div>

        <label
          htmlFor="productImages"
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D9C8B3] bg-[#FCFAF7] px-5 py-9 text-center transition hover:border-[#A17B50] hover:bg-[#F8F3EB] ${
            submitting ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <div className="mb-3 rounded-full bg-[#F0E5D5] p-4 text-[#704A2D]">
            <ImagePlus size={26} />
          </div>

          <span className="text-sm font-semibold text-[#49392C]">
            Click to upload product images
          </span>

          <span className="mt-1 text-xs text-[#81756A]">
            Select multiple images at once
          </span>

          <input
            id="productImages"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="hidden"
            disabled={submitting}
          />
        </label>

        {imagePreviews.length > 0 && (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-[#49392C]">
                Selected Images
              </p>

              <span className="rounded-lg bg-[#F5F0E8] px-3 py-1 text-xs font-semibold text-[#704A2D]">
                {images.length} selected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {imagePreviews.map((preview, index) => (
                <div
                  key={`${images[index]?.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-[#EAE2D7] bg-[#FCFAF7]"
                >
                  <img
                    src={preview}
                    alt={`Product preview ${index + 1}`}
                    className="h-36 w-full object-cover"
                  />

                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 rounded-md bg-[#704A2D] px-2 py-1 text-xs font-medium text-white">
                      First image
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    disabled={submitting}
                    aria-label={`Remove image ${index + 1}`}
                    className="absolute right-2 top-2 rounded-full bg-white/95 p-2 text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <X size={15} />
                  </button>

                  <p className="truncate px-2 py-2 text-xs text-[#81756A]">
                    {images[index]?.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="rounded-2xl border border-[#EAE2D7] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-[#2B2520]">
              Product Features
            </h2>
            <p className="mt-1 text-sm text-[#81756A]">
              Highlight the unique features of this product.
            </p>
          </div>

          <button
            type="button"
            onClick={addFeature}
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E8E0D5] px-4 py-2.5 text-sm font-medium text-[#704A2D] transition hover:bg-[#F5F0E8] disabled:opacity-50"
          >
            <Plus size={16} />
            Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                value={feature}
                onChange={(event) =>
                  handleFeatureChange(index, event.target.value)
                }
                className={inputClass}
                placeholder={`Feature ${index + 1}, e.g. Authentic Ajrakh Print`}
                disabled={submitting}
                aria-label={`Product feature ${index + 1}`}
              />

              <button
                type="button"
                onClick={() => removeFeature(index)}
                disabled={submitting}
                title="Remove feature"
                aria-label={`Remove feature ${index + 1}`}
                className="shrink-0 rounded-xl border border-red-100 p-3 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Publishing Settings */}
      <section className="rounded-2xl border border-[#EAE2D7] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#2B2520]">
            Publishing Settings
          </h2>
          <p className="mt-1 text-sm text-[#81756A]">
            Choose how this product appears in your collection.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#EAE2D7] p-4 transition hover:bg-[#FCFAF7]">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              disabled={submitting}
              className="mt-1 h-4 w-4 accent-[#704A2D]"
            />

            <span>
              <span className="block text-sm font-semibold text-[#49392C]">
                Featured Product
              </span>
              <span className="mt-1 block text-xs text-[#81756A]">
                Mark this product as featured.
              </span>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#EAE2D7] p-4 transition hover:bg-[#FCFAF7]">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              disabled={submitting}
              className="mt-1 h-4 w-4 accent-[#704A2D]"
            />

            <span>
              <span className="block text-sm font-semibold text-[#49392C]">
                Active Product
              </span>
              <span className="mt-1 block text-xs text-[#81756A]">
                Make this product active.
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Form Actions */}
      <div className="flex flex-col-reverse justify-between gap-3 pb-4 sm:flex-row sm:items-center">
        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E8E0D5] bg-white px-5 py-3 text-sm font-medium text-[#704A2D] transition hover:bg-[#F5F0E8]"
        >
          <ArrowLeft size={17} />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#704A2D] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#573820] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save size={17} />
          {submitting ? "Saving Product..." : "Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
