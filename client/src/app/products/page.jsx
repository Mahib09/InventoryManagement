"use client";
import React, { useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../state/api";
import { PlusCircle, SearchIcon } from "lucide-react";
import Header from "../(components)/Header";
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";
import Image from "next/image";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData) => {
    await createProduct(productData);
  };
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      alert("Product deleted successfully");
    } catch (error) {
      alert("Failed to delete product", error);
    }
  };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch the products
      </div>
    );
  }
  return (
    <div className="mx-auto pb-5 w-full">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search Producs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2 !text-gray-200" /> Create Product
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div className="py-4">Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-inventorymanagement-mahib.s3.us-east-2.amazonaws.com/product${
                    Math.floor(Math.random() * 8) + 1
                  }.png`}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36 object-cover"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {product.name}
                </h3>
                <p className="text-gray-800 ">${product.price.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
                <button
                  onClick={() => handleDeleteProduct(product.productId)}
                  className="bg-red-300 p-2 mt-2 rounded-lg hover:bg-red-500"
                >
                  Delete Product
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
