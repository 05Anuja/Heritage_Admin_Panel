import React from "react";
import ProductActions from "./ProductActions";

const ProductRow = ({ product, onDelete }) => {
  const image = product.images?.[0];

  return (
    <tr className="border-b border-[#F0EAE1] transition-colors hover:bg-[#FDFCFA]">
      {/* Product image and name */}
      <td className="px-5 py-4">
        <div className="flex min-w-64 items-center gap-3">
          {image ? (
            <img
              src={image}
              alt={product.name || "Product"}
              loading="lazy"
              className="h-16 w-12 shrink-0 rounded-lg border border-[#EAE2D7] bg-[#F5F0E7] object-cover"
            />
          ) : (
            <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F5F0E7] text-xs text-[#81756A]">
              No image
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold text-[#3D3025]">
              {product.name || "Unnamed Product"}
            </p>

            <p className="mt-1 text-xs text-[#81756A]">
              ID: {product._id?.slice(-6).toUpperCase() || "—"}
            </p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-5 py-4 text-sm text-[#655548]">
        {product.category || "—"}
      </td>

      {/* Material */}
      <td className="px-5 py-4 text-sm text-[#655548]">
        {product.material || "—"}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <div className="flex flex-col items-start gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              product.active
                ? "bg-emerald-50 text-emerald-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {product.active ? "Active" : "Inactive"}
          </span>

          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <span aria-hidden="true">★</span>
              Featured
            </span>
          )}
        </div>
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <ProductActions product={product} onDelete={onDelete} />
      </td>
    </tr>
  );
};

export default ProductRow;
