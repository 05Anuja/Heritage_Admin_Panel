import React from "react";
import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

const ProductActions = ({ product, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <Link
        to={`/products/view/${product._id}`}
        title="View product"
        aria-label={`View ${product.name}`}
        className="inline-flex items-center justify-center rounded-lg border border-[#E8E0D5] p-2 text-[#704A2D] transition hover:border-[#C9B18B] hover:bg-[#F5F0E8]"
      >
        <Eye size={17} />
      </Link>

      <Link
        to={`/products/edit/${product._id}`}
        title="Edit product"
        aria-label={`Edit ${product.name}`}
        className="inline-flex items-center justify-center rounded-lg border border-[#E8E0D5] p-2 text-[#704A2D] transition hover:border-[#C9B18B] hover:bg-[#F5F0E8]"
      >
        <Pencil size={17} />
      </Link>

      <button
        type="button"
        onClick={() => onDelete(product)}
        title="Delete product"
        aria-label={`Delete ${product.name}`}
        className="inline-flex items-center justify-center rounded-lg border border-red-100 p-2 text-red-600 transition hover:border-red-200 hover:bg-red-50"
      >
        <Trash2 size={17} />
      </button>
    </div>
  );
};

export default ProductActions;
