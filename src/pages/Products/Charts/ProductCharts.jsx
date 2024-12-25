import React, { useState } from "react";
import {
  Bar,
  Line,
  Scatter,
  Pie,
  Radar,
  PolarArea,
  Bubble,
} from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "../../../components/Sidebar";

const ProductCharts = () => {
  const [chartsData, setChartsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/invenquity/product"
      );
      const products = await response.json();

      // Process categories
      const categories = [...new Set(products.map((p) => p.productCategory))];

      // Calculate chart data
      const quantities = categories.map((category) =>
        products
          .filter((p) => p.productCategory === category)
          .reduce((sum, p) => sum + p.quantity, 0)
      );

      const avgRatings = categories.map((category) => {
        const filtered = products.filter((p) => p.productCategory === category);
        return (
          filtered.reduce((sum, p) => sum + p.rating, 0) / filtered.length
        ).toFixed(2);
      });

      const priceDistribution = categories.map((category) =>
        products
          .filter((p) => p.productCategory === category)
          .reduce((sum, p) => sum + p.price, 0)
      );

      const qualityDistribution = products.map((p) => p.quality);
      const minimumProducts = products.map((p) => p.minimumProducts);

      // Advanced Chart Data
      const radarRatings = {
        labels: categories,
        datasets: [
          {
            label: "Ratings",
            data: avgRatings,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            pointBackgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      };

      const polarPriceData = {
        labels: categories,
        datasets: [
          {
            label: "Price Distribution",
            data: priceDistribution,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      };

      const bubbleData = {
        datasets: products.map((p) => ({
          label: p.productName,
          data: [
            {
              x: p.quantity,
              y: p.price,
              r: p.rating * 3, // Bubble size based on rating
            },
          ],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        })),
      };

      // Set chart data
      setChartsData({
        quantitiesData: {
          labels: categories,
          datasets: [
            {
              label: "Quantities by Category",
              data: quantities,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"],
            },
          ],
        },
        ratingsData: {
          labels: categories,
          datasets: [
            {
              label: "Average Ratings by Category",
              data: avgRatings,
              borderColor: "#42A5F5",
              fill: false,
            },
          ],
        },
        priceData: {
          labels: categories,
          datasets: [
            {
              label: "Price Distribution by Category",
              data: priceDistribution,
              backgroundColor: ["#FF7043", "#26A69A", "#AB47BC", "#FFA726"],
            },
          ],
        },
        qualityData: {
          labels: products.map((p) => p.id),
          datasets: [
            {
              label: "Quality Distribution",
              data: qualityDistribution,
              backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726", "#AB47BC"],
            },
          ],
        },
        scatterData: {
          datasets: [
            {
              label: "Quantity vs Minimum Products",
              data: products.map((p) => ({
                x: p.quantity,
                y: p.minimumProducts,
              })),
              backgroundColor: "#42A5F5",
            },
          ],
        },
        radarRatings,
        polarPriceData,
        bubbleData,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6 ml-4">
        <h2 className="text-3xl font-bold text-center mb-6">Advanced Product Visualizations</h2>
        <div className="flex justify-center mb-6">
          <button
            onClick={fetchData}
            disabled={loading}
            className={`px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Fetch Data"
            )}
          </button>
        </div>

        {chartsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Quantities by Category</h3>
              <Bar data={chartsData.quantitiesData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Average Ratings by Category</h3>
              <Line data={chartsData.ratingsData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Price Distribution by Category</h3>
              <Bar data={chartsData.priceData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quality Distribution</h3>
              <Pie data={chartsData.qualityData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quantity vs Minimum Products</h3>
              <Scatter data={chartsData.scatterData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Radar Chart - Ratings by Category</h3>
              <Radar data={chartsData.radarRatings} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Polar Area Chart - Price Distribution</h3>
              <PolarArea data={chartsData.polarPriceData} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Bubble Chart - Quantity vs Price vs Rating</h3>
              <Bubble data={chartsData.bubbleData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCharts;