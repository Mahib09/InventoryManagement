import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../(components)/Header";

const CreateProductModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    productId: uuidv4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product Name is required.";
    if (isNaN(formData.price) || formData.price <= 0)
      newErrors.price = "Valid Price is required.";
    if (isNaN(formData.stockQuantity) || formData.stockQuantity < 0)
      newErrors.stockQuantity = "Valid Stock Quantity is required.";
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 5)
      newErrors.rating = "Rating must be between 0 and 5.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreate(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md required";

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking inside the form
      >
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="name" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className={`${inputCssStyles} ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label htmlFor="price" className={labelCssStyles}>
            Product Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={formData.price || ""}
            className={`${inputCssStyles} ${
              errors.price ? "border-red-500" : ""
            }`}
            min="0" // Prevent negative prices
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={formData.stockQuantity || ""}
            className={`${inputCssStyles} ${
              errors.stockQuantity ? "border-red-500" : ""
            }`}
            min="0" // Prevent negative stock quantities
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm">{errors.stockQuantity}</p>
          )}

          <label htmlFor="rating" className={labelCssStyles}>
            Rating (0-5)
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
            value={formData.rating || ""}
            className={`${inputCssStyles} ${
              errors.rating ? "border-red-500" : ""
            }`}
            min="0" // Prevent negative ratings
            max="5" // Prevent ratings above 5
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating}</p>
          )}

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Create
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
