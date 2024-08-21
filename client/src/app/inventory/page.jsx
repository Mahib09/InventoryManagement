"use client";

import Header from "../(components)/Header";
import { useGetProductsQuery } from "../state/api";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

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
    <div className="flex flex-col">
      <Header name="Inventory" />
    </div>
  );
};

export default Inventory;
