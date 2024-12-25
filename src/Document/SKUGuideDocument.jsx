import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import React, { useState } from "react";

function SKUGuideDocument({ onClose }) {
    const [showDownloadButton, setShowDownloadButton] = useState(false);

    const handleDownloadPDF = () => {
        const element = document.querySelector('.guide-content');
        
        // Define options for html2pdf
        const options = {
            filename: 'SKU-Guide.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 }, // Higher scale for better quality
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        // Generate the PDF
        html2pdf().from(element).set(options).save();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg rounded-lg w-full md:w-3/4 lg:w-2/3 p-6 relative max-h-[93vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Guide Content */}
                <div
                    className="max-w-full mx-auto"
                    onMouseEnter={() => setShowDownloadButton(true)}
                    onMouseLeave={() => setShowDownloadButton(false)}
                >
                    {showDownloadButton && (
                        <button
                            onClick={handleDownloadPDF}
                            className="absolute top-4 right-16 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Download Guide (PDF)
                        </button>
                    )}

                    <div className="guide-content">
                        <h1 className="text-3xl font-semibold mb-6">SKU Code Generation Guide</h1>
                        <p className="text-lg mb-6">This guide provides instructions for creating SKU (Stock Keeping Unit) codes for products in the inventory management system. Follow these guidelines to ensure consistency and uniqueness across the inventory.</p>

                        <hr className="mb-6" />

                        <h2 className="text-2xl font-semibold mb-3">1. General SKU Format</h2>
                        <p>The SKU code is structured as:</p>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm">
                            <code>&lt;Category Abbreviation&gt;-&lt;Brand Abbreviation&gt;-&lt;Unique Feature/Specification&gt;</code>
                        </pre>

                        <h3 className="text-xl font-semibold mt-6 mb-3">Example:</h3>
                        <pre className="bg-gray-100 p-4 rounded-md text-sm">
                            <code>SMP-SM-5G</code>
                        </pre>

                        <h2 className="text-2xl font-semibold mt-6 mb-3">2. Abbreviation Guidelines</h2>

                        <h3 className="text-xl font-semibold mt-4 mb-2">a. Category Abbreviation</h3>
                        <p>The following table lists predefined abbreviations for common product categories:</p>

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full mt-4 mb-6 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2 bg-gray-50">Category Name</th>
                                        <th className="border px-4 py-2 bg-gray-50">Abbreviation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[ 
                                        ["Smartphone", "SMP"],
                                        ["Laptop", "LPT"],
                                        ["Tablet", "TBL"],
                                        ["Smartwatch", "SWT"],
                                        ["Headphone", "HPH"],
                                        ["Speaker", "SPK"],
                                        ["Television", "TV"],
                                        ["Camera", "CAM"],
                                        ["Desktop Computer", "DPC"],
                                        ["Gaming Console", "GMC"],
                                        ["Keyboard", "KBD"],
                                        ["Mouse", "MSE"],
                                        ["Monitor", "MON"],
                                        ["Printer", "PRN"],
                                        ["Scanner", "SCN"],
                                        ["Router", "RTR"],
                                        ["External Storage (HDD/SSD)", "EXT"],
                                        ["Drone", "DRN"],
                                        ["Projector", "PJR"],
                                        ["Smart Home Device", "SHD"],
                                        ["Air Conditioner (Smart AC)", "SAC"],
                                        ["Refrigerator", "RFR"],
                                        ["Microwave", "MWV"],
                                        ["Washing Machine", "WSH"]
                                    ].map(([category, abbr], index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{category}</td>
                                            <td className="border px-4 py-2">{abbr}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <p className="font-medium">Note: For new categories, create a 3-character abbreviation that logically represents the category name.</p>

                        <h3 className="text-xl font-semibold mt-6 mb-3">b. Brand Abbreviation</h3>
                        <p>Use the first <strong>two characters</strong> of the brand name in uppercase. Example:</p>
                        <ul className="list-disc pl-5">
                            <li><strong>Samsung</strong> → <code>SM</code></li>
                            <li><strong>Apple</strong> → <code>AP</code></li>
                            <li><strong>Dell</strong> → <code>DL</code></li>
                        </ul>

                        <h3 className="text-xl font-semibold mt-6 mb-3">c. Unique Feature/Specification</h3>
                        <p>Include a defining feature or specification, such as:</p>
                        <ul className="list-disc pl-5">
                            <li>Connectivity Type: <code>5G</code>, <code>WIFI</code></li>
                            <li>Storage Capacity: <code>256GB</code></li>
                            <li>Series Name: <code>GM</code> (Gaming)</li>
                        </ul>

                        <hr className="mt-6 mb-6" />

                        <h2 className="text-2xl font-semibold mb-3">3. Rules for SKU Code Creation</h2>
                        <ol className="list-decimal pl-5 mb-6">
                            <li><strong>Uniqueness</strong>: Each SKU code must be unique to avoid conflicts.</li>
                            <li><strong>No Spaces or Special Characters</strong>: Use hyphens (<code>-</code>) as delimiters.</li>
                            <li><strong>Case Sensitivity</strong>: Always use uppercase letters.</li>
                            <li><strong>Mandatory Segments</strong>: All three segments (category, brand, specification) must be included.</li>
                        </ol>

                        <h2 className="text-2xl font-semibold mb-3">4. Examples of SKU Codes</h2>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full mt-4 mb-6 border-collapse">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2 bg-gray-50">Product Description</th>
                                        <th className="border px-4 py-2 bg-gray-50">SKU Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[ 
                                        ["Smartphone, Samsung, 5G", "SMP-SM-5G"],
                                        ["Laptop, Dell, 16GB RAM", "LPT-DL-16GB"],
                                        ["Headphone, Bose, Noise Cancelling", "HPH-BS-NC"],
                                        ["Gaming Console, Sony, PlayStation 5", "GMC-SY-PS5"],
                                        ["Monitor, LG, 27-inch", "MON-LG-27IN"],
                                        ["Router, TP-Link, Dual-Band", "RTR-TPL-DB"],
                                        ["Drone, DJI, 4K Camera", "DRN-DJ-4K"],
                                        ["Refrigerator, LG, Double Door", "RFR-LG-DD"]
                                    ].map(([desc, sku], index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{desc}</td>
                                            <td className="border px-4 py-2 font-mono">{sku}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-2xl font-semibold mb-3">5. Steps for Creating SKU Codes</h2>
                        <ol className="list-decimal pl-5 mb-6">
                            <li><strong>Determine Product Category</strong>: Identify the category and select its abbreviation.</li>
                            <li><strong>Identify the Brand</strong>: Extract the first two letters of the brand name.</li>
                            <li><strong>Choose a Unique Feature</strong>: Select the key specification to add as the final segment.</li>
                            <li><strong>Combine Segments</strong>: Concatenate the three segments using hyphens (<code>-</code>).</li>
                            <li><strong>Verify Uniqueness</strong>: Ensure the SKU code does not already exist.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SKUGuideDocument;