import React from "react";
import { PackageOpen } from "lucide-react";
import ProductRow from "./ProductRow";

const ProductTable = ({ products = [], loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#EAE2D7] bg-white">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#E8DCC8] border-t-[#704A2D]" />

        <p className="mt-4 text-sm text-[#81756A]">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#EAE2D7] bg-white px-5 py-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5F0E7] text-[#A88651]">
          <PackageOpen size={28} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[#2B2520]">
          No products found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-[#81756A]">
          There are no products to display. Add a product or try changing your
          filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#EAE2D7] bg-white shadow-sm">
      <table className="w-full min-w-[850px] text-left">
        <thead className="bg-[#F7F3EC]">
          <tr className="text-xs uppercase tracking-wider text-[#81756A]">
            <th scope="col" className="px-5 py-4 font-semibold">
              Product
            </th>

            <th scope="col" className="px-5 py-4 font-semibold">
              Category
            </th>

            <th scope="col" className="px-5 py-4 font-semibold">
              Material
            </th>

            <th scope="col" className="px-5 py-4 font-semibold">
              Status
            </th>

            <th scope="col" className="px-5 py-4 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
