import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Chip,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import Sidebar from "../../components/Sidebar";
import PageTitle from "../../components/PageTitle";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [skuFilter, setSkuFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [categories, setCategories] = useState([]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/invenquity/product"
      );
      const data = await response.json();
      setProducts(data);

      // Extract unique categories for dropdown
      const uniqueCategories = [
        "All",
        ...new Set(data.map((product) => product.productCategory)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter Products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || product.productCategory === categoryFilter;

    const matchesSku =
      skuFilter === "" ||
      product.skuCode.toLowerCase().includes(skuFilter.toLowerCase());

    return matchesSearch && matchesCategory && matchesSku;
  });

  return (
    <div className="flex">
      <PageTitle title="Product Info" />
      <Sidebar />
      <div className="flex-grow p-6 ml-4">
        <Box sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Product Inventory
          </Typography>

          {/* Filters */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: 4,
              alignItems: "center",
            }}
          >
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TextField
              label="Search by SKU"
              variant="outlined"
              size="small"
              value={skuFilter}
              onChange={(e) => setSkuFilter(e.target.value)}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Product Grid */}
          <Grid container spacing={4}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card sx={{ maxWidth: 345, boxShadow: 4 }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image="https://via.placeholder.com/300" // Replace with actual image URL if available
                    alt={product.productName}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
                      <Chip
                        label={product.productCategory}
                        color="primary"
                        size="small"
                      />
                      <Tooltip title="Quality Rating">
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <StarIcon color="warning" />
                          {product.rating}
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Price:</strong> ${product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {product.quantity}
                    </Typography>
                    <Typography variant="body2">
                      <strong>SKU Code:</strong> {product.skuCode}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ textAlign: "center", marginTop: 4 }}
            >
              No products match the criteria.
            </Typography>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Product;
