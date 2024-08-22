const express = require("express");
const { getExpensesByCategory } = require("../controllers/expenseController");

const router = express.Router();
router.get("/", getExpensesByCategory);

module.exports = router;
