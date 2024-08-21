const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: "insensitive", // Optional: make the search case-insensitive
            },
          }
        : {},
    });
    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error); // Logging the error
    res.status(500).json({ message: "Error retrieving products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body; // Fixed typo from rq.body to req.body

    // Basic validation (could be enhanced)
    if (!name || price == null || rating == null || stockQuantity == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error); // Logging the error
    res.status(500).json({ message: "Error creating product" });
  }
};

module.exports = { getProducts, createProduct };
