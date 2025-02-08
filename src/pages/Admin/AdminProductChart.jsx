import React, { useState } from "react";
import { Bar, Line, Scatter, Pie, Radar, PolarArea, Bubble } from "react-chartjs-2";
import "chart.js/auto";
import AdminSidebar from "./AdminSidebar";
import PageTitle from "../../components/PageTitle";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ProductCharts = () => {
  const [chartsData, setChartsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/invenquity/product",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const products = await response.json();

      const categories = [...new Set(products.map((p) => p.productCategory))];

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

      const colors = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#00A36C",
      ];
      
      const bubbleData = {
        datasets: products.map((p, index) => ({
          label: p.productName,
          data: [
            {
              x: p.quantity,
              y: p.price,
              r: p.rating * 3,
            },
          ],
          backgroundColor: colors[index % colors.length], // Assign color from the array
        })),
      };

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

  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const chartContainers = document.querySelectorAll(".chart-container");

    for (let i = 0; i < chartContainers.length; i++) {
      const canvas = await html2canvas(chartContainers[i]);
      const imgData = canvas.toDataURL("image/png");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save("Product_Charts_Report.pdf");
  };

  return (
    <div className="flex">
      <PageTitle title="InvenQuity | Product Chart" />
      <AdminSidebar />
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
            {loading ? "Loading..." : "Fetch Data"}
          </button>
        </div>

        {chartsData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(chartsData).map(([key, data], index) => (
                <div key={index} className="chart-container p-4 bg-white shadow rounded">
                  <h3 className="text-xl font-semibold mb-4">{key.replace(/([A-Z])/g, " $1")}</h3>
                  {key.includes("quantitiesData") && <Bar data={data} />}
                  {key.includes("ratingsData") && <Line data={data} />}
                  {key.includes("priceData") && <Bar data={data} />}
                  {key.includes("qualityData") && <Pie data={data} />}
                  {key.includes("scatterData") && <Scatter data={data} />}
                  {key.includes("radarRatings") && <Radar data={data} />}
                  {key.includes("polarPriceData") && <PolarArea data={data} />}
                  {key.includes("bubbleData") && <Bubble data={data} />}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={downloadPDF}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md"
              >
                Download PDF
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCharts;