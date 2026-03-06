require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err);
});

/* API Routes */
app.use("/api", productRoutes);

/* Root Route */
app.get("/", (req, res) => {
    res.send("E-commerce Catalog API is running successfully 🚀");
});

/* Server Port */
const PORT = process.env.PORT || 3000;

/* Start Server */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});